package com.anna.recept.service.impl;

import com.anna.recept.entity.Ingredient;
import com.anna.recept.exception.Errors;
import com.anna.recept.exception.ReceptApplicationException;
import com.anna.recept.repository.IngredientRepository;
import com.anna.recept.service.IIngredientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;

import java.util.List;

@Service
public class IngredientService implements IIngredientService {

    @Autowired
    private IngredientRepository ingRep;

    @Override
    @Transactional
    public Ingredient saveIngredient(Ingredient ingredient) {
        Assert.notNull(ingredient, Errors.REQUEST_MUST_NOT_BE_NULL.getCause());
        Assert.isNull(ingredient.getId(), Errors.ID_MUST_BE_NULL.getCause());

        if (isUniqueIngredientName(ingredient.getName())) {
            return ingRep.saveAndFlush(ingredient);
        }
        throw new ReceptApplicationException(Errors.INGRIDIENT_NAME_NOT_UNIQUE);
    }


    private boolean isUniqueIngredientName(String name) {
        return !name.isEmpty() && ingRep.findByNameIgnoreCase(name).isEmpty();
    }

    @Override
    @Transactional
    public void deleteIngredient(Integer ingId) {
        ingRep.delete(ingId);
    }

    @Override
    public List<Ingredient> showAllIngredients() {
        return ingRep.findAll();
    }

}
