package com.anna.recept.controller;

import com.anna.recept.dto.FilePath;
import com.anna.recept.service.IFileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
public class FileController {

    @Autowired
    private IFileService fileService;

    @RequestMapping(value = {"/file"}, method = RequestMethod.POST, consumes = "multipart/form-data")
    public FilePath saveTempFileFile(@RequestBody MultipartFile file) throws IOException {
        return new FilePath(fileService.saveTemporaryFile(file));
    }
}
