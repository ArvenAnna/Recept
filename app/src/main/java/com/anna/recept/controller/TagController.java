package com.anna.recept.controller;

import com.anna.recept.entity.Tag;
import com.anna.recept.service.ITagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TagController {

    @Autowired
    private ITagService tagService;

    @RequestMapping(value = {"/tags.req"}, method = RequestMethod.GET,
            headers = "Accept=application/json")
    public List<Tag> fetchAllTags() {
        return tagService.findTags();
    }


//    @RequestMapping(value = {"/categories.req"}, method = RequestMethod.GET,
//            headers = "Accept=application/json")
//    public List<Tag> fetchTags(@RequestParam("receptId") Integer receptId) {
//        return tagService.findTagsByRecept(receptId);
//    }
}
