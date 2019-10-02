package com.anna.recept.service;

import com.anna.recept.dto.IngredientDto;
import com.anna.recept.entity.Ingredient;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;

public interface IIngredientService {

    IngredientDto saveIngredient(IngredientDto ingredient);

    @Transactional
    IngredientDto updateIngredient(IngredientDto ingredient);

    void deleteIngredient(Long ingId);

    List<IngredientDto> showAllIngredients();

    List<IngredientDto> showIngredients(List<Long> ids);

    List<IngredientDto> searchIngredients(String str);
}
