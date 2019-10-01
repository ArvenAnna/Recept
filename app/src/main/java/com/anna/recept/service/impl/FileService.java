package com.anna.recept.service.impl;

import com.anna.recept.service.IFileService;
import com.anna.recept.utils.FilePathUtils;
import org.apache.commons.io.FileUtils;
import org.imgscalr.Scalr;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import javax.servlet.ServletContext;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.io.UncheckedIOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;
import java.util.stream.Stream;

@Service
public class FileService implements IFileService {

    private static final String TEMP_LOCATION_ENV = "TEMP_LOCATION";
    private static final String FOTO_LOCATION_ENV = "FOTO_LOCATION";
    private static final String PREVIEW_IMAGE_PREFIX_ENV = "PREVIEW_IMAGE_PREFIX";

    public static final int SMALL_IMAGE_TARGET_SIZE = 300;
    public static final String INGREDIENTS_CATALOG = "ingredients";

    @Autowired
    ServletContext context;

    @Override
    public String saveTemporaryFile(MultipartFile file) throws IOException {
        String newPath = System.getenv(TEMP_LOCATION_ENV) + File.separator + UUID.randomUUID().toString() +
            "_" + file.getOriginalFilename();
        String filePath = context.getRealPath("") + newPath;
        File upload = new File(filePath);
        FileUtils.writeByteArrayToFile(upload, file.getBytes());
        return newPath;
    }

    private File getFileInPhotoCatalog(String name) {
        return new File(getPathnameInPhotoCatalog(name));
    }

    private String getPathnameInPhotoCatalog(String name) {
        return context.getRealPath("") + File.separator
                + System.getenv(FOTO_LOCATION_ENV) + File.separator + name;
    }

    private String getPathnameInRoot(String name) {
        return context.getRealPath("") + File.separator
                + name;
    }

    // todo: check how it works
    @Override
    public void deleteRecipeFolder(String department, String recipeName) {
        String dirPath = department + File.separator + recipeName;
        try {
            FileUtils.deleteDirectory(getFileInPhotoCatalog(dirPath));
        } catch (IOException e) {
            throw new UncheckedIOException(e);
        }
    }

    @Override
    public void cleanTempFiles() {
        String tempDir = context.getRealPath("") + File.separator + System.getenv(TEMP_LOCATION_ENV);
        File tempDirFile = new File(tempDir);
        for (String s: tempDirFile.list()) {
            File currentFile = new File(tempDirFile.getPath(), s);
            currentFile.delete();
        }
    }

	@Override
	public String saveRecipeFile(String path, String department, String name) {
        return saveFile(path, department, name);
    }

    @Override
    public String saveIngredientFile(String path, String name) {
        return saveFile(path, INGREDIENTS_CATALOG, name);
    }

    private String saveFile(String path, String catalog, String subCatalog) {
        if (isTempPath(path)) {
            String pathNameInsidePhotoCatalog = FilePathUtils.constructPathWithCatalogsToRealFile(path, catalog, subCatalog);
            String smallFilePathNameInsidePhotoCatalog = FilePathUtils.constructPathToSmallRealFile(pathNameInsidePhotoCatalog, System.getenv(PREVIEW_IMAGE_PREFIX_ENV));
            saveNormalAndSmallFiles(path, pathNameInsidePhotoCatalog, smallFilePathNameInsidePhotoCatalog);
            return pathNameInsidePhotoCatalog;

        } else {
            return replaceFileIfNeededAndGetPath(path, catalog, subCatalog);
        }
    }

    private boolean isTempPath(String path) {
        return path != null && path.startsWith(System.getenv(TEMP_LOCATION_ENV))
                && path.split(File.separator).length == 2;
    }

    private void saveNormalAndSmallFiles(String tempPath, String name, String smallFileName) {
        File newFile = getFileInPhotoCatalog(name);
        File smallFile = getFileInPhotoCatalog(smallFileName);

        File temp = new File(getPathnameInRoot(tempPath));
        if (!temp.getAbsolutePath().equals(newFile.getAbsolutePath())) {
            try {
                FileUtils.copyFile(temp, newFile);
                createSmallImage(temp, smallFile);
            } catch (IOException e) {
                throw new UncheckedIOException(e);
            }

            new File(getPathnameInRoot(tempPath)).delete();
        }
    }

    private void createSmallImage(File fileFrom, File fileTo) throws IOException {
        BufferedImage img = ImageIO.read(fileFrom);
        BufferedImage scaledImg = Scalr.resize(img, SMALL_IMAGE_TARGET_SIZE);

        ImageIO.write(scaledImg, FilePathUtils.getFileExtensionFromPath(fileFrom.getPath()), fileTo);
    }

    private String replaceFileIfNeededAndGetPath(String path, String catalog, String subCatalog) {
        String newCatalogName = FilePathUtils.constructCatalogName(catalog, subCatalog);
        String changedFilePath = FilePathUtils.getChangedCatalogsInPath(path, newCatalogName);
        if (path != null && !path.equals(changedFilePath)) {
            replaceFilesInCatalog(FilePathUtils.extractCatalogFromPath(path), newCatalogName);
            return changedFilePath;
        }
        return path;
    }

    // all files will be replaced from one catalog to another
    private void replaceFilesInCatalog(String oldPathToCatalog, String newPathToCatalog) {
        if (oldPathToCatalog.equals(newPathToCatalog)) return;

        Path oldCatalogPath = Paths.get(getPathnameInPhotoCatalog(oldPathToCatalog));
        Path targetPath = Paths.get(getPathnameInPhotoCatalog(newPathToCatalog));

        try {
            Files.createDirectories(targetPath);
        }
        catch (IOException e) {
            throw new UncheckedIOException(e);
        }

        if (Files.exists(oldCatalogPath)) {
            Stream.of(oldCatalogPath.toFile().listFiles()).forEach(file -> {
                try {
                    Files.move(file.toPath(),
                            targetPath.resolve(file.getName()),
                            StandardCopyOption.REPLACE_EXISTING);
                }
                catch (IOException e) {
                    throw new UncheckedIOException(e);
                }
            });
            oldCatalogPath.toFile().delete();
        }
    }
}
