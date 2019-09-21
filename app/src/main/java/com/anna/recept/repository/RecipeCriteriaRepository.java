package com.anna.recept.repository;

import com.anna.recept.dto.SearchRecipeParams;
import com.anna.recept.entity.Recipe;

import java.util.List;

public interface RecipeCriteriaRepository {
    List<Recipe> findRecipesBySearchParams(SearchRecipeParams params);
}
