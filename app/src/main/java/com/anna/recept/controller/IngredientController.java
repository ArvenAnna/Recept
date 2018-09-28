package com.anna.recept.controller;

import com.anna.recept.entity.Ingredient;
import com.anna.recept.service.IIngredientService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class IngridientController {

    @Autowired
    private IIngredientService ingredientService;

    @RequestMapping(value = {"/ing_list.req"}, method = RequestMethod.GET,
            headers = "Accept=application/json")
    @ResponseBody
    public List<Ingredient> showIngridients() {
        return ingredientService.showAllIngredients();
    }

    @RequestMapping(value = {"/ingredient.req"}, method = RequestMethod.POST,
            headers = "Accept=application/json")
    @ResponseBody
    public Ingredient saveIngredient(@RequestBody Ingredient ingredient) {
        return ingredientService.saveIngredient(ingredient);
    }

    @RequestMapping(value = {"/ingredient.req"}, method = RequestMethod.DELETE,
            headers = "Accept=application/json")
    @ResponseBody
    public void deleteIngredient(@RequestParam("ingId") Integer ingId) {
        ingredientService.deleteIngredient(ingId);
    }

}
