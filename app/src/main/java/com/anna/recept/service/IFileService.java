package com.anna.recept.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

public interface IFileService {

    File getXsdScheme() throws IOException;

    File getXslFile() throws IOException;

    File getLangConfig() throws IOException;

    byte[] getReceptMainFoto(Integer receptId) throws IOException;

    //byte[] getDetailFoto(Integer detailId) throws IOException;

    //void saveReceptMainFoto(MultipartFile file, Integer receptId) throws IOException;

    //void saveDetailFoto(MultipartFile file, Integer detailId) throws IOException;

    String saveTemporaryFile(MultipartFile file) throws IOException;

    String saveRealFile(String tempPath, String name) throws IOException;

    void cleanTempFiles() throws IOException;
}
