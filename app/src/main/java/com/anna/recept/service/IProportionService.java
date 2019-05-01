package com.anna.recept.service;

import java.util.List;

import com.anna.recept.dto.RecipeDto;

public interface IProportionService {

	RecipeDto addProportionsToRecipe(Long recipeId, List<RecipeDto.ProportionDto> proportions);

	RecipeDto deleteProportionsFromRecipe(Long recipeId, List<Long> proportionIds);
}
