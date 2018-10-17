package com.anna.recept.service;

import java.util.List;

import com.anna.recept.dto.RecipeDto;

public interface IDetailService {

	RecipeDto addDetailsToRecipe(Long recipeId, List<RecipeDto.DetailDto> details);

	RecipeDto deleteDetailsFromRecipe(Long recipeId, List<Long> detailIds);
}
