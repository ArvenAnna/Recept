package com.anna.recept.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface IXmlService {
    Integer getReceptFromXml(MultipartFile file) throws IOException;

    byte[] getPdfFromRecept(Integer receptId) throws IOException;
}
