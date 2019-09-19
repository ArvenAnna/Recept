package com.anna.recept.service;

import com.anna.recept.dto.RecipeDto;
import com.anna.recept.dto.SearchRecipeParams;

import java.util.List;

public interface IRecipeService {

    List<RecipeDto> getRecipes();

    RecipeDto getRecipe(Long recipeId);

    void removeRecipe(Long recipeId);

    RecipeDto saveRecipe(RecipeDto recipe);

    RecipeDto updateRecipe(RecipeDto recipe);

    List<RecipeDto> findRecipesByParams(SearchRecipeParams params);

    List<RecipeDto> findRecipesNameByKeyword(String keyword);
}
