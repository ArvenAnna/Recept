package com.anna.recept.service.impl;

import com.anna.recept.entity.Recept;
import com.anna.recept.exception.Errors;
import com.anna.recept.exception.ReceptApplicationException;
import com.anna.recept.service.IFileService;
import com.anna.recept.service.IReceptService;
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
    private static final String RESOURCE_ROOT_LOCATION = "resource.root.location";

    private static final String TEMP_LOCATION_ENV = "TEMP_LOCATION";
    private static final String ALTERNATIVE_IMAGE = "alt.png";
    private static final String RECEPT_SCHEME = "recept_scheme.xsd";
    private static final String RECEPT_XSL = "recept.xsl";
    private static final String LANG_CONFIG = "Lang.xml";

    @Autowired
    ServletContext context;

    @Autowired
    private IReceptService receptService;

//    @Autowired
//    private IDetailService detailService;

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

    private String constructReceptFileUploadPath(String path) {
        return context.getInitParameter(UPLOAD_LOCATION) + File.separator + path;
    }

    private String constructResourcePath(String path) {
        return context.getInitParameter(RESOURCE_ROOT_LOCATION) + File.separator + path ;
    }

    private String constructXmlResourcePath(String path) {
        return context.getInitParameter(RESOURCE_LOCATION) + File.separator + path;
    }

    private String constructReceptSavePath(Integer receptId, String fileName) {
        Recept recept = receptService.showRecept(receptId);
        return recept.getDepartment().getName() + File.separator +
                recept.getName() + File.separator + fileName;
    }

    private String retrieveFilePath(Integer receptId) {
        return receptService.getRecept(receptId).getImgPath();
    }

//    private String retrieveDetailFilePath(Integer detailId) {
//        return detailService.findDetail(detailId).getFilePath();
//    }

    @Override
    public byte[] getReceptMainFoto(Integer receptId) throws IOException {
        String path = constructReceptFileUploadPath(retrieveFilePath(receptId));
        return FileUtils.readFileToByteArray(createReceptFotoFile(path));
    }

//    @Override
//    public byte[] getDetailFoto(Integer detailId) throws IOException {
//        String path = constructReceptFileUploadPath(retrieveDetailFilePath(detailId));
//        return FileUtils.readFileToByteArray(createReceptFotoFile(path));
//    }

    @Override
    public void saveReceptMainFoto(MultipartFile file, Integer receptId) throws IOException {
        String path = constructReceptSavePath(receptId, file.getOriginalFilename());
        File upload = new File(constructReceptFileUploadPath(path));
        FileUtils.writeByteArrayToFile(upload, file.getBytes());

        receptService.saveFilePath(receptId, path);
    }

//    @Override
//    public void saveDetailFoto(MultipartFile file, Integer detailId) throws IOException {
//        Integer receptId = detailService.findReceptByDetailId(detailId).getId();
//
//        String path = constructReceptSavePath(receptId, file.getOriginalFilename());
//        File upload = new File(constructReceptFileUploadPath(path));
//        FileUtils.writeByteArrayToFile(upload, file.getBytes());
//
//        detailService.saveFilePath(path, detailId);
//    }

    @Override
    public String saveFile(MultipartFile file) throws IOException {
        String newPath = System.getenv(TEMP_LOCATION_ENV) + File.separator + UUID.randomUUID().toString() +
            "_" + file.getOriginalFilename();
        String filePath = context.getRealPath("") + newPath;
        File upload = new File(filePath);
        FileUtils.writeByteArrayToFile(upload, file.getBytes());
        return newPath;
    }

    @Override
    public String saveTempFile(String tempPath, String name) throws IOException {
        File realFile = new File(context.getInitParameter(UPLOAD_LOCATION) + File.separator + name);
        File webappFile = new File(context.getRealPath("") + File.separator + "foto" + File.separator + name);
        File temp = new File(context.getRealPath("") + File.separator + tempPath);
        if (!temp.getAbsolutePath().equals(webappFile.getAbsolutePath())) {
            FileUtils.copyFile(temp, realFile);
            FileUtils.copyFile(temp, webappFile);
            String tempFilePath = context.getRealPath("") + File.separator + tempPath;
            new File(tempFilePath).delete();
        }
        return name;
    }

    private File createReceptFotoFile(String path) {
        File file = new File(path);
        if (!file.exists()) {
            file = new File(constructReceptFileUploadPath(ALTERNATIVE_IMAGE));
            if (!file.exists()) {
                throw new ReceptApplicationException(Errors.FILE_NOT_FOUND);
            }
        }
        return file;
    }
}
