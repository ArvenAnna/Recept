package com.anna.recept.service;

import com.anna.recept.dto.RecipeDto;

import java.util.List;

public interface IRecipeService {

    List<RecipeDto> getRecipes();

    RecipeDto getRecipe(Long recipeId);

    void removeRecipe(Long recipeId);

    RecipeDto saveRecipe(RecipeDto recipe);

    RecipeDto updateRecipe(RecipeDto recipe);

    RecipeDto addRefsToRecipe(Long recipeId, List<Long> refIds);

    RecipeDto deleteRefsFromRecipe(Long recipeId, List<Long> refIds);

    List<RecipeDto> findRecipesByIngredients(List<Long> ingIds);

    List<RecipeDto> findRecipesByKeyword(String keyword);

    List<RecipeDto> findRecipesNameByKeyword(String keyword);
}
