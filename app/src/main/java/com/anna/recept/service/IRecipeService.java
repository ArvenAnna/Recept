package com.anna.recept.service;

import com.anna.recept.dto.RecipeDto;
import com.anna.recept.dto.RecipePage;
import com.anna.recept.dto.SearchRecipeParams;

import java.util.List;

import javax.validation.Valid;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IRecipeService {

    RecipeDto getRecipe(Long recipeId);

    void removeRecipe(Long recipeId);

    RecipeDto saveRecipe(RecipeDto recipe);

    RecipeDto updateRecipe(RecipeDto recipe);

    List<RecipeDto> findRecipesByParams(@Valid SearchRecipeParams params);

    List<RecipeDto> findRecipesNameByKeyword(String keyword);

    List<RecipeDto> getRecipes(List<Long> ids);

    RecipePage findRecipesByParamsPageable(SearchRecipeParams params, Pageable pageable);
}
