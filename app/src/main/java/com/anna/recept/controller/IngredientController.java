package com.anna.recept.controller;

import com.anna.recept.dto.IngredientDto;
import com.anna.recept.dto.SearchByKeywordRequest;
import com.anna.recept.entity.Ingredient;
import com.anna.recept.service.IIngredientService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotNull;
import java.util.List;

@RestController
@RequestMapping(value = {"/ingredients"}, headers = "Accept=application/json")
public class IngredientController {

    @Autowired
    private IIngredientService ingredientService;

    @RequestMapping(method = RequestMethod.GET)
    public List<IngredientDto> showIngredients() {
        return ingredientService.showAllIngredients();
    }

    /**
     * Finds ingredients without children
     * @param ids
     * @return
     */
    @RequestMapping(value = {"/ids"}, method = RequestMethod.POST)
    public List<IngredientDto> showIngredientsByIds(@RequestBody List<Long> ids) {
        return ingredientService.showIngredients(ids);
    }

    @RequestMapping(value = {"/{ingredientId}"}, method = RequestMethod.GET)
    public IngredientDto getIngredient(@PathVariable("ingredientId") Long ingredientId) {
        return ingredientService.getIngredient(ingredientId);
    }

    @RequestMapping(method = RequestMethod.POST)
    public IngredientDto saveIngredient(@RequestBody IngredientDto ingredient) {
        return ingredientService.saveIngredient(ingredient);
    }

    @RequestMapping(method = RequestMethod.PUT)
    public IngredientDto updateIngredient(@RequestBody IngredientDto ingredient) {
        return ingredientService.updateIngredient(ingredient);
    }

    @RequestMapping(value = {"/{ingId}"}, method = RequestMethod.DELETE)
    public void deleteIngredient(@PathVariable("ingId") Long ingId) {
        ingredientService.deleteIngredient(ingId);
    }

    /**
     * Finds ingredients without children
     * @param request
     * @return
     */
    @RequestMapping(value = {"/keyword"}, method = RequestMethod.POST)
    public List<IngredientDto> findIngredientsBySearchString(@RequestBody @NotNull SearchByKeywordRequest request) {
        return ingredientService.searchIngredients(request.getKeyword());
    }

}
