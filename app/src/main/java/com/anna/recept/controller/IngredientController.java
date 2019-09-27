package com.anna.recept.controller;

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
    public List<Ingredient> showIngredients() {
        return ingredientService.showAllIngredients();
    }

    @RequestMapping(value = {"/ids"}, method = RequestMethod.POST)
    public List<Ingredient> showIngredientsByIds(@RequestBody List<Long> ids) {
        return ingredientService.showIngredients(ids);
    }

    @RequestMapping(method = RequestMethod.POST)
    public Ingredient saveIngredient(@RequestBody Ingredient ingredient) {
        return ingredientService.saveIngredient(ingredient);
    }

    @RequestMapping(value = {"/{ingId}"}, method = RequestMethod.DELETE)
    public void deleteIngredient(@PathVariable("ingId") Long ingId) {
        ingredientService.deleteIngredient(ingId);
    }

    @RequestMapping(value = {"/keyword"}, method = RequestMethod.POST)
    public List<Ingredient> findIngredientsBySearchString(@RequestBody @NotNull SearchByKeywordRequest request) {
        return ingredientService.searchIngredients(request.getKeyword());
    }

}
