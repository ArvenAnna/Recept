package com.anna.recept.service.impl;

import com.anna.recept.dto.IngredientDto;
import com.anna.recept.entity.Ingredient;
import com.anna.recept.exception.Errors;
import com.anna.recept.exception.RecipeApplicationException;
import com.anna.recept.repository.IngredientRepository;
import com.anna.recept.service.IIngredientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class IngredientService implements IIngredientService {

    @Autowired
    private IngredientRepository ingRep;
    @Autowired
    private FileService fileService;

    @Override
    @Transactional
    public IngredientDto saveIngredient(IngredientDto ingredient) {
        Assert.notNull(ingredient, Errors.REQUEST_MUST_NOT_BE_NULL.getCause());
        Assert.isNull(ingredient.getId(), Errors.ID_MUST_BE_NULL.getCause());

        if (isUniqueIngredientName(ingredient.getName())) {
            return convertAndSave(ingredient);
        }
        throw new RecipeApplicationException(Errors.INGREDIENT_NAME_NOT_UNIQUE);
    }

    @Override
    @Transactional
    public IngredientDto updateIngredient(IngredientDto ingredient) {
        Assert.notNull(ingredient, Errors.REQUEST_MUST_NOT_BE_NULL.getCause());
        Assert.notNull(ingredient.getId(), Errors.ID_MUST_NOT_BE_NULL.getCause());

        Ingredient ingWithSameNewName = ingRep.findByNameIgnoreCase(ingredient.getName());
        if (ingWithSameNewName != null && !ingWithSameNewName.getId().equals(ingredient.getId())) {
            throw new RecipeApplicationException(Errors.INGREDIENT_NAME_NOT_UNIQUE);
        }

        return convertAndSave(ingredient);
    }

    @Override
    @Transactional
    public IngredientDto getIngredient(Long id) {
        return IngredientDto.of(ingRep.getOne(id));
    }

    private IngredientDto convertAndSave(IngredientDto ingredient) {
        Ingredient parent = ingredient.getParent() != null ? ingRep.getOne(ingredient.getParent()) : null;

        Ingredient ingredientEntity = IngredientDto.toEntity(ingredient,
                fileService.saveIngredientFile(ingredient.getImgPath(), ingredient.getName()),
                parent);
        return IngredientDto.of(ingRep.saveAndFlush(ingredientEntity));
    }

    private boolean isUniqueIngredientName(String name) {
        return !name.isEmpty() && ingRep.findByNameIgnoreCase(name) == null;
    }

    @Override
    @Transactional
    public void deleteIngredient(Long ingId) {
        ingRep.deleteById(ingId);
    }

    @Override
    @Transactional
    public List<IngredientDto> showAllIngredients() {
        return ingRep.findAll().stream().map(IngredientDto::of).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public List<IngredientDto> showIngredients(List<Long> ids) {
        return ingRep.findAllById(ids).stream().map(IngredientDto::of).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public List<IngredientDto> searchIngredients(String str) {
        return (str == null || str.trim().isEmpty())
                ? new ArrayList<>()
                : ingRep.findByNameIgnoreCaseContaining(str.trim()).stream()
                        .limit(10L)
                        .map(IngredientDto::of).collect(Collectors.toList());
    }

}
