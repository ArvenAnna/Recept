package com.anna.recept.controller;

import com.anna.recept.entity.Department;
import com.anna.recept.entity.Recept;
import com.anna.recept.service.IDepartService;
import com.anna.recept.service.IReceptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
public class MainController {
    @Autowired
    private IReceptService receptService;

    @Autowired
    private IDepartService departServ;

    @RequestMapping(value = {"/departs.req"}, method = RequestMethod.GET,
            headers = "Accept=application/json")
    public List<Department> departsList() {
        Object o = null;
        System.out.println(o);
        return departServ.findAllDepartments();
    }

    @RequestMapping(value = {"/recept_list.req"}, method = RequestMethod.GET,
            headers = "Accept=application/json")
    public List<Recept> receptList(@RequestParam("departId") Integer departId) {
        return receptService.showReceptDtos(departId);
    }

    @RequestMapping(value = {"/recept.req"}, method = RequestMethod.GET,
            headers = "Accept=application/json")
    public Recept receptShow(@RequestParam("receptId") Integer receptId) {
        return receptService.showRecept(receptId);
    }

//    @RequestMapping(value = {"/recept.req"}, method = RequestMethod.DELETE,
//            headers = "Accept=application/json")
//    public void receptDelete(@RequestParam("receptId") Integer receptId) {
//        receptService.deleteRecept(receptId);
//    }

    @RequestMapping(value = {"/recept.req"}, method = RequestMethod.POST,
            headers = "Accept=application/json")
    public Integer saveUniqueRecept(@RequestBody Recept recept) throws IOException {
        return receptService.saveRecept(recept);
    }

//    @RequestMapping(value = {"/recept_list_tag.req"}, method = RequestMethod.GET,
//            headers = "Accept=application/json")
//    public List<Recept> receptListByTag(@RequestParam("tagId") Integer tagId) {
//        return receptService.showReceptsByTag(tagId);
//    }
}
