package com.anna.recept.service;

import com.anna.recept.dto.IngredientDto;
import com.anna.recept.entity.Ingredient;

import java.util.List;

public interface IIngredientService {

    Ingredient saveIngredient(IngredientDto ingredient);

    void deleteIngredient(Long ingId);

    List<Ingredient> showAllIngredients();

    List<Ingredient> showIngredients(List<Long> ids);

    List<Ingredient> searchIngredients(String str);
}
