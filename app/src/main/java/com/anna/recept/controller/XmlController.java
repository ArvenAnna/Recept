package com.anna.recept.controller;

import com.anna.recept.service.IXmlService;
//import org.apache.avalon.framework.configuration.ConfigurationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.xml.sax.SAXException;

import javax.servlet.http.HttpServletResponse;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.TransformerException;
import java.io.IOException;
import java.io.OutputStream;

//@Controller
public class XmlController {

//    @Autowired
//    private IXmlService xmlService;

//    @RequestMapping(value = {"/xmlFile.req"}, method = RequestMethod.POST)
//    @ResponseBody
//    public Integer parseXmlFile(MultipartFile file) throws IOException, ParserConfigurationException, SAXException {
//        return xmlService.getReceptFromXml(file);
//    }

//    @RequestMapping(value = {"/pdfFile.req"}, method = RequestMethod.GET)
//    @ResponseBody
//    public void getPdfFile(Long receptId, HttpServletResponse response) throws IOException, ParserConfigurationException, SAXException, TransformerException, ConfigurationException {
//        byte[] file = xmlService.getPdfFromRecept(receptId);
//        if (file != null) {
//            OutputStream outStream = response.getOutputStream();
//            outStream.write(file);
//            outStream.close();
//        }
//    }

}
