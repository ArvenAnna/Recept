package com.anna.recept.controller;

import com.anna.recept.entity.Detail;
import com.anna.recept.service.IDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class DetailController {

    @Autowired
    private IDetailService detailService;

//    @RequestMapping(value = {"/detail.req"}, method = RequestMethod.POST,
//            headers = "Accept=application/json")
//    public Integer saveDetail(@RequestBody Detail detail) {
//        return detailService.saveDetail(detail);
//    }
//
//    @RequestMapping(value = {"/detail.req"}, method = RequestMethod.DELETE,
//            headers = "Accept=application/json")
//    public void deleteDetail(@RequestParam("detId") Integer detId) {
//        detailService.deleteDetail(detId);
//    }
//
//    @RequestMapping(value = {"/details.req"}, method = RequestMethod.GET,
//            headers = "Accept=application/json")
//    public List<Detail> fetchDetails(@RequestParam("receptId") Integer receptId) {
//        return detailService.findReceptsDetails(receptId);
//    }


}
