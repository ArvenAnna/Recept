package com.anna.recept.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.anna.recept.dto.RecipeDto;
import com.anna.recept.entity.Detail;
import com.anna.recept.entity.Recipe;
import com.anna.recept.exception.Errors;
import com.anna.recept.repository.RecipeRepository;
import com.anna.recept.service.IDetailService;

@Service
public class DetailService implements IDetailService {

	@Autowired
	private RecipeRepository recipeRep;

	@Override
	@Transactional
	public RecipeDto addDetailsToRecipe(Long recipeId, List<RecipeDto.DetailDto> details) {
		Recipe recipe = recipeRep.findById(recipeId).orElseThrow(() -> new EntityNotFoundException(Errors.RECIPE_NOT_FOUND.getCause()));

		List<Detail> detailsToAdd = details.stream().map(detail -> Detail.of(detail, recipe)).collect(Collectors.toList());

		recipe.getDetails().addAll(detailsToAdd);
		return RecipeDto.withAllFields(recipeRep.saveAndFlush(recipe));
	}

	@Override
	@Transactional
	public RecipeDto deleteDetailsFromRecipe(Long recipeId, List<Long> detailIds) {
		Recipe recipe = recipeRep.findById(recipeId).orElseThrow(() -> new EntityNotFoundException(Errors.RECIPE_NOT_FOUND.getCause()));
		List<Detail> detailsToRemove = recipe.getDetails().stream()
				.filter(detail -> detailIds.contains(detail.getId())).collect(Collectors.toList());

		recipe.getDetails().removeAll(detailsToRemove);
		return RecipeDto.withAllFields(recipeRep.saveAndFlush(recipe));
	}
}
