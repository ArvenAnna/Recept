package com.anna.recept.controller;

import com.anna.recept.dto.RecipeDto;
import com.anna.recept.dto.RecipePage;
import com.anna.recept.dto.SearchByKeywordRequest;
import com.anna.recept.dto.SearchRecipeParams;
import com.anna.recept.service.IRecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.List;

@RestController
@RequestMapping(value = {"/recipes"}, headers = "Accept=application/json", produces="application/json")
public class MainController {

    @Autowired
    private IRecipeService recipeService;

    @RequestMapping(value = {"/ids"}, method = RequestMethod.POST)
    public List<RecipeDto> getRecipesByIds(@RequestBody List<Long> ids) {
        return recipeService.getRecipes(ids);
    }

    @RequestMapping(value = {"/{recipeId}"}, method = RequestMethod.GET)
    public RecipeDto getRecipe(@PathVariable("recipeId") Long recipeId) {
        return recipeService.getRecipe(recipeId);
    }

    @RequestMapping(value = {"/{recipeId}"}, method = RequestMethod.DELETE)
    public void removeRecipe(@PathVariable("recipeId") Long recipeId) {
        recipeService.removeRecipe(recipeId);
    }

    @RequestMapping(method = RequestMethod.POST)
    public RecipeDto saveUniqueRecipe(@RequestBody @Valid @NotNull(message = "Request should not be null") RecipeDto recipe) {
        return recipeService.saveRecipe(recipe);
    }

    @RequestMapping(method = RequestMethod.PUT)
    public RecipeDto updateRecipe(@RequestBody @Valid @NotNull(message = "Request should not be null") RecipeDto recipe) {
        return recipeService.updateRecipe(recipe);
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<RecipeDto> findRecipesBySearchParams(SearchRecipeParams params) {
        return recipeService.findRecipesByParams(params);
    }

    @RequestMapping(value = {"/keyword"}, method = RequestMethod.POST)
    public List<RecipeDto> findRecipesNameByKeyword(@RequestBody @NotNull SearchByKeywordRequest request) {
        return recipeService.findRecipesNameByKeyword(request.getKeyword());
    }

    @RequestMapping(value = {"/page"}, method = RequestMethod.GET)
    public RecipePage findRecipesBySearchParamsPaginated(SearchRecipeParams params, @NotNull final Pageable pageable) {
        return recipeService.findRecipesByParamsPageable(params, pageable);
    }

}
