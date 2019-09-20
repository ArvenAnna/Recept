package com.anna.recept.service.impl;

import com.anna.recept.service.IFileService;
import com.anna.recept.service.IRecipeService;

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

    private static final String UPLOAD_LOCATION = "upload.location";
    private static final String RESOURCE_LOCATION = "resource.xml.location";

    private static final String TEMP_LOCATION_ENV = "TEMP_LOCATION";
    private static final String FOTO_LOCATION_ENV = "FOTO_LOCATION";

    private static final String ALTERNATIVE_IMAGE = "alt.png";
    private static final String RECEPT_SCHEME = "recept_scheme.xsd";
    private static final String RECEPT_XSL = "recipe.xsl";
    private static final String LANG_CONFIG = "Lang.xml";

    @Autowired
    ServletContext context;

    @Autowired
    private IRecipeService receptService;


    @Override
    public File getXsdScheme() throws IOException {
        return new File(constructXmlResourcePath(RECEPT_SCHEME));
    }

    @Override
    public File getXslFile() throws IOException {
        return new File(constructXmlResourcePath(RECEPT_XSL));
    }

    @Override
    public File getLangConfig() throws IOException {
        return new File(constructXmlResourcePath(LANG_CONFIG));
    }

    private String constructXmlResourcePath(String path) {
        return context.getInitParameter(RESOURCE_LOCATION) + File.separator + path;
    }

    @Override
    public String saveTemporaryFile(MultipartFile file) throws IOException {
        String newPath = System.getenv(TEMP_LOCATION_ENV) + File.separator + UUID.randomUUID().toString() +
            "_" + file.getOriginalFilename();
        String filePath = context.getRealPath("") + newPath;
        File upload = new File(filePath);
        FileUtils.writeByteArrayToFile(upload, file.getBytes());
        return newPath;
    }

    // todo:make it void
    @Override
    public String saveRealFile(String tempPath, String name) throws IOException {
        File webappFile = new File(context.getRealPath("") + File.separator +System.getenv(FOTO_LOCATION_ENV) + File.separator + name);

        File temp = new File(context.getRealPath("") + File.separator + tempPath);
        if (!temp.getAbsolutePath().equals(webappFile.getAbsolutePath())) {
            FileUtils.copyFile(temp, webappFile);
            String tempFilePath = context.getRealPath("") + File.separator + tempPath;
            new File(tempFilePath).delete();
        }

        return name;
    }

    @Override
    public String saveRealFileAndResize(String tempPath, String name) throws IOException {
        this.saveRealFile(tempPath, name);

        File newFile = new File(context.getRealPath("") + File.separator +System.getenv(FOTO_LOCATION_ENV) + File.separator + name);

//        //todo: make a small copy of this file
//        resizeImage(newFile);

        return name;
    }

    @Override
    public String saveNormalAndSmallFiles(String tempPath, String name, String smallFileName) throws IOException {
        File newFile = new File(context.getRealPath("") + File.separator +System.getenv(FOTO_LOCATION_ENV) + File.separator + name);
        File smallFile = new File(context.getRealPath("") + File.separator +System.getenv(FOTO_LOCATION_ENV) + File.separator + smallFileName);

        File temp = new File(context.getRealPath("") + File.separator + tempPath);
        if (!temp.getAbsolutePath().equals(newFile.getAbsolutePath())) {
            FileUtils.copyFile(temp, newFile);
            createSmallImage(temp, smallFile);

            String tempFilePath = context.getRealPath("") + File.separator + tempPath;
            new File(tempFilePath).delete();
        }

        return name;
    }


    public void createSmallImage(File fileFrom, File fileTo) throws IOException {
        BufferedImage img = ImageIO.read(fileFrom);

        BufferedImage scaledImg = Scalr.resize(img, 300);

        String filePath = fileFrom.getPath();
        String[] pathFragments = filePath.split("\\.");
        String extension = pathFragments[pathFragments.length - 1];

        //File outputFile = new File("image.jpg");
        ImageIO.write(scaledImg, extension, fileTo);
    }

    @Override
    public void deleteRealFile(String path) {
        String dir = context.getRealPath("") + File.separator + System.getenv(FOTO_LOCATION_ENV) + File.separator + path;
        File dirFile = new File(dir);
        dirFile.delete();
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

    // all files will be replaced from one catalog to another
    public void replaceFilesInCatalog(String oldPathToCatalog, String newPathToCatalog) {
        if (oldPathToCatalog.equals(newPathToCatalog)) return;
		String oldDir = context.getRealPath("") + System.getenv(FOTO_LOCATION_ENV)
				+ File.separator + oldPathToCatalog;
		String newDir = context.getRealPath("") + System.getenv(FOTO_LOCATION_ENV)
				+ File.separator + newPathToCatalog;
		Path oldCatalogPath = Paths.get(oldDir);
		Path targetPath = Paths.get(newDir);

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
