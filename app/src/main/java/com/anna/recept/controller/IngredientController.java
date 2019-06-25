package com.anna.recept.controller;

import com.anna.recept.entity.Ingredient;
import com.anna.recept.service.IIngredientService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class IngredientController {

    @Autowired
    private IIngredientService ingredientService;

    @RequestMapping(value = {"/ingredients"}, method = RequestMethod.GET, headers = "Accept=application/json")
    public List<Ingredient> showIngredients() {
        return ingredientService.showAllIngredients();
    }

    @RequestMapping(value = {"/ingredients"}, method = RequestMethod.POST,
            headers = "Accept=application/json")
    public Ingredient saveIngredient(@RequestBody Ingredient ingredient) {
        return ingredientService.saveIngredient(ingredient);
    }

    @RequestMapping(value = {"/ingredients/{ingId}"}, method = RequestMethod.DELETE,
            headers = "Accept=application/json")
    public void deleteIngredient(@PathVariable("ingId") Long ingId) {
        ingredientService.deleteIngredient(ingId);
    }

    @RequestMapping(value = {"/ingredients/keyword/{keyword}"}, method = RequestMethod.GET, headers = "Accept=application/json")
    public List<Ingredient> findIngredientsBySearchString(@PathVariable("keyword") String str) {
        return ingredientService.searchIngredients(str);
    }

}
