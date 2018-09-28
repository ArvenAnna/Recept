package com.anna.recept.service;

import com.anna.recept.entity.Ingredient;

import java.util.List;

public interface IIngredientService {

    Ingredient saveIngredient(Ingredient ingredient);

    void deleteIngredient(Integer ingId);

    List<Ingredient> showAllIngredients();
}
