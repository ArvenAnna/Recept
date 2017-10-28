package com.anna.recept.controller;

import com.anna.recept.service.IFileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;

@Controller
public class FileController {

    @Autowired
    private IFileService fileService;

    @RequestMapping(value = {"/file.req"}, method = RequestMethod.POST)
    @ResponseBody
    public String saveReceptFile(MultipartFile file) throws IOException {
        return fileService.saveFile(file);
    }

//
//    @RequestMapping(value = {"/detail_file.req"}, method = RequestMethod.POST)
//    @ResponseBody
//    public void saveDetailFile(Integer detailId, MultipartFile file, HttpServletResponse response) throws IOException {
//        fileService.saveDetailFoto(file, detailId);
//        writeResponse(response, file.getBytes());
//    }

//
//    private void writeResponse(HttpServletResponse response, byte[] file) throws IOException {
//        OutputStream outStream = response.getOutputStream();
//        outStream.write(file);
//        outStream.close();
//    }
}
