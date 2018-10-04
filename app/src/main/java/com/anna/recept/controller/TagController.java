package com.anna.recept.controller;

import com.anna.recept.entity.Recipe;
import com.anna.recept.entity.Tag;
import com.anna.recept.service.ITagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TagController {

    @Autowired
    private ITagService tagService;

    @RequestMapping(value = {"/tags"}, method = RequestMethod.GET, headers = "Accept=application/json")
    public List<Tag> fetchAllTags() {
        return tagService.findTags();
    }

    @RequestMapping(value = {"/recipes/{recipeId}/tags"}, method = RequestMethod.GET, headers = "Accept=application/json")
    public List<Tag> fetchTagsByRecipe(@PathVariable("recipeId") Long recipeId) {
        return tagService.findTagsByRecipe(recipeId);
    }

    @RequestMapping(value = {"/tags/{tagId}/recipes"}, method = RequestMethod.GET, headers = "Accept=application/json")
    public List<Recipe> fetchRecipesByTag(@PathVariable("tagId") Integer tagId) {
        return tagService.findRecipesByTag(tagId);
    }

    @RequestMapping(value = {"/tags"}, method = RequestMethod.POST, headers = "Accept=application/json")
    public Tag createTag(@RequestBody Tag tag) {
        return tagService.createTag(tag);
    }

    @RequestMapping(value = {"/tags/{id}"}, method = RequestMethod.DELETE, headers = "Accept=application/json")
    public void removeTag(@PathVariable("id") Integer id) {
        tagService.removeTag(id);
    }

    @RequestMapping(value = {"/recipes/{recipeId}/tags"}, method = RequestMethod.POST, headers = "Accept=application/json")
    public Recipe addTagsToRecipe(@PathVariable("recipeId") Long recipeId, @RequestBody List<Integer> tagIds) {
        return tagService.addTagsToRecipe(recipeId, tagIds);
    }

    @RequestMapping(value = {"/recipes/{recipeId}/tags"}, method = RequestMethod.DELETE, headers = "Accept=application/json")
    public Recipe deleteTagsFromRecipe(@PathVariable("recipeId") Long recipeId, @RequestBody List<Integer> tagIds) {
        return tagService.deleteTagsFromRecipe(recipeId, tagIds);
    }
}
