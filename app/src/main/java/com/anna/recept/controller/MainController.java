package com.anna.recept.controller;

import com.anna.recept.entity.Recipe;
import com.anna.recept.service.IRecipeService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ser.impl.SimpleBeanPropertyFilter;
import com.fasterxml.jackson.databind.ser.impl.SimpleFilterProvider;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
public class MainController {

    @Autowired
    private IRecipeService recipeService;

    private ObjectMapper objectMapper = new ObjectMapper();

    @RequestMapping(value = {"/recipes"}, method = RequestMethod.GET,
            headers = "Accept=application/json", produces="application/json")
    public JsonNode getRecipesList() throws IOException {

        final List<Recipe> books = recipeService.showRecipes();
        final SimpleFilterProvider filter = new SimpleFilterProvider();
        filter.addFilter("Recipe", SimpleBeanPropertyFilter.serializeAllExcept("details", "proportions", "tags", "refs"));
        return objectMapper.readTree(objectMapper.writer(filter).withDefaultPrettyPrinter().writeValueAsString(books));
        //return recipeService.showRecipes();
    }


    @RequestMapping(value = {"/recipes/{recipeId}"}, method = RequestMethod.GET,
            headers = "Accept=application/json")
    public Recipe getRecipe(@PathVariable("recipeId") Long recipeId) {
        return recipeService.getRecipe(recipeId);
    }

    @RequestMapping(value = {"/recipes/{recipeId}"}, method = RequestMethod.DELETE,
            headers = "Accept=application/json")
    public void removeRecipe(@PathVariable("recipeId") Long recipeId) {
        recipeService.removeRecipe(recipeId);
    }

    @RequestMapping(value = {"/recipes"}, method = RequestMethod.POST,
            headers = "Accept=application/json")
    public Recipe saveUniqueRecipe(@RequestBody Recipe recipe) throws IOException {
        return recipeService.saveRecipe(recipe);
    }

    @RequestMapping(value = {"/recipes"}, method = RequestMethod.PUT,
            headers = "Accept=application/json")
    public Recipe updateRecept(@RequestBody Recipe recipe) throws IOException {
        return recipeService.saveRecipe(recipe);
    }

//    @RequestMapping(value = {"/recept_list_tag.req"}, method = RequestMethod.GET,
//            headers = "Accept=application/json")
//    public List<Recipe> receptListByTag(@RequestParam("tagId") Integer tagId) {
//        return receptService.showReceptsByTag(tagId);
//    }
}
