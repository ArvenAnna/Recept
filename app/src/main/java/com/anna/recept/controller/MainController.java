package com.anna.recept.controller;

import com.anna.recept.dto.RecipeDto;
import com.anna.recept.dto.SearchByKeywordRequest;
import com.anna.recept.dto.SearchRecipeParams;
import com.anna.recept.exception.Errors;
import com.anna.recept.service.IRecipeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

@RestController
public class MainController {

    @Autowired
    private IRecipeService recipeService;

    //todo: move some annotations to class level
    @RequestMapping(value = {"/recipes"}, method = RequestMethod.GET,
            headers = "Accept=application/json", produces="application/json")
    public List<RecipeDto> getRecipesList() {
        return recipeService.getRecipes();
    }

    @RequestMapping(value = {"/recipes/{recipeId}"}, method = RequestMethod.GET,
            headers = "Accept=application/json")
    public RecipeDto getRecipe(@PathVariable("recipeId") Long recipeId) {
        return recipeService.getRecipe(recipeId);
    }

    @RequestMapping(value = {"/recipes/{recipeId}"}, method = RequestMethod.DELETE,
            headers = "Accept=application/json")
    public void removeRecipe(@PathVariable("recipeId") Long recipeId) {
        recipeService.removeRecipe(recipeId);
    }

    @RequestMapping(value = {"/recipes"}, method = RequestMethod.POST,
            headers = "Accept=application/json")
    public RecipeDto saveUniqueRecipe(@RequestBody @Valid @NotNull(message = "Request should not be null") RecipeDto recipe) {
        return recipeService.saveRecipe(recipe);
    }

    @RequestMapping(value = {"/recipes"}, method = RequestMethod.PUT,
            headers = "Accept=application/json")
    public RecipeDto updateRecipe(@RequestBody @Valid @NotNull(message = "Request should not be null") RecipeDto recipe) {
        return recipeService.updateRecipe(recipe);
    }

    @RequestMapping(value = {"/recipes/search"}, method = RequestMethod.GET, headers = "Accept=application/json")
    public List<RecipeDto> findRecipesByIngredients(SearchRecipeParams params) {
        return recipeService.findRecipesByParams(params);
    }

    @RequestMapping(value = {"/recipes/keyword"}, method = RequestMethod.POST, headers = "Accept=application/json")
    public List<RecipeDto> findRecipesNameByKeyword(@RequestBody @NotNull SearchByKeywordRequest request) {
        return recipeService.findRecipesNameByKeyword(request.getKeyword());
    }

}
