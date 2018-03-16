package com.anna.recept.controller;

import com.anna.recept.entity.Ingridient;
import com.anna.recept.service.IIngridientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class IngridientController {

    @Autowired
    private IIngridientService ingridientService;

    @RequestMapping(value = {"/ing_list.req"}, method = RequestMethod.GET,
            headers = "Accept=application/json")
    @ResponseBody
    public List<Ingridient> showIngridients() {
        return ingridientService.showAllIngridients();
    }


    @RequestMapping(value = {"/ingridient.req"}, method = RequestMethod.POST,
            headers = "Accept=application/json")
    @ResponseBody
    public Integer saveIngridient(@RequestBody Ingridient ingridient) {
        return ingridientService.saveUniqueIngridient(ingridient);
    }

//    @RequestMapping(value = {"/ingridient.req"}, method = RequestMethod.DELETE,
//            headers = "Accept=application/json")
//    @ResponseBody
//    public void deleteIngridient(@RequestParam("ingId") Integer ingId) {
//        ingridientService.deleteIngridient(ingId);
//    }

}
