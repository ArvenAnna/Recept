package com.anna.recept.controller;

import com.anna.recept.service.IFileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Controller
public class FileController {

    @Autowired
    private IFileService fileService;

    @RequestMapping(value = {"/file.req"}, method = RequestMethod.POST)
    @ResponseBody
    public String saveReceptFile(MultipartFile file) throws IOException {
        return fileService.saveFile(file);
    }
}
