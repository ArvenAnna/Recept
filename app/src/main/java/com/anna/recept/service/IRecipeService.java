package com.anna.recept.service;

import com.anna.recept.entity.Recipe;

import java.io.IOException;
import java.util.List;

public interface IRecipeService {

    List<Recipe> showRecipes();

    List<Recipe> showReceptDtos(Integer departId);

    Recipe getRecept(Long receptId);

    Recipe saveRecipe(Recipe recipe) throws IOException;

    void saveFilePath(Long receptId, String path);

    List<Recipe> showReceptsByTag(Integer tagId);

    Recipe getRecept(String name);

    Recipe getRecipe(Long recipeId);

    void removeRecipe(Long recipeId);
}
