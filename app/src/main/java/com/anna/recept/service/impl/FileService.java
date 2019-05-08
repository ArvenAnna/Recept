package com.anna.recept.service.impl;

import com.anna.recept.service.IFileService;
import com.anna.recept.service.IRecipeService;

import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletContext;
import java.io.File;
import java.io.IOException;
import java.util.UUID;

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
        File webappFile = new File(context.getRealPath("") + File.separator + name);
        File temp = new File(context.getRealPath("") + File.separator + tempPath);
        if (!temp.getAbsolutePath().equals(webappFile.getAbsolutePath())) {
            FileUtils.copyFile(temp, webappFile);
            String tempFilePath = context.getRealPath("") + File.separator + tempPath;
            new File(tempFilePath).delete();
        }
        return name;
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
}
