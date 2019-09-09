package com.anna.recept.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

public interface IFileService {

    File getXsdScheme() throws IOException;

    File getXslFile() throws IOException;

    File getLangConfig() throws IOException;

    String saveTemporaryFile(MultipartFile file) throws IOException;

    String saveRealFile(String tempPath, String name) throws IOException;

    void deleteRealFile(String path) throws IOException;

    void cleanTempFiles() throws IOException;

    void replaceFilesInCatalog(String oldPathTocatalog, String newName);
}
