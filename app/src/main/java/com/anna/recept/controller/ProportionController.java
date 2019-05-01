package com.anna.recept.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.anna.recept.dto.RecipeDto;
import com.anna.recept.service.IProportionService;

@RestController
public class ProportionController {

	@Autowired
	private IProportionService proportionService;

	@RequestMapping(value = {"/recipes/{recipeId}/proportions"}, method = RequestMethod.POST, headers = "Accept=application/json")
	public RecipeDto addProportionsToRecipe(@PathVariable("recipeId") Long recipeId, @RequestBody List<RecipeDto.ProportionDto> proportions) {
		return proportionService.addProportionsToRecipe(recipeId, proportions);
	}

	@RequestMapping(value = {"/recipes/{recipeId}/proportions"}, method = RequestMethod.DELETE, headers = "Accept=application/json")
	public RecipeDto deleteProportionsFromRecipe(@PathVariable("recipeId") Long recipeId,
			@RequestBody List<Long> proportionIds) {
		return proportionService.deleteProportionsFromRecipe(recipeId, proportionIds);
	}
}
