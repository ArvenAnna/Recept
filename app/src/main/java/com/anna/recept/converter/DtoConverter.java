package com.anna.recept.converter;

import com.anna.recept.entity.*;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.util.stream.Collectors;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class DtoConverter {

    public static Recipe toReceptDto(Recipe recipe) {
        Recipe dto = new Recipe();
        dto.setId(recipe.getId());
        dto.setName(recipe.getName());
        dto.setImgPath(recipe.getImgPath());
        return dto;
    }

    public static Recipe withChildren(Recipe recipe) {
        Recipe dto = toReceptDto(recipe);
        dto.setText(recipe.getText());
        dto.setProportions(recipe.getProportions().stream()
                .map(DtoConverter::toProportionDto)
                .collect(Collectors.toList()));
        dto.setDepartment(toDepartmentDto(recipe.getDepartment()));
        dto.setDetails(recipe.getDetails().stream()
                .map(DtoConverter::toDetailDto)
                .collect(Collectors.toList()));
        dto.setRefs(recipe.getRefs().stream()
                .map(DtoConverter::toReceptDto)
                .collect(Collectors.toList()));
        dto.setTags(recipe.getTags().stream()
                .map(DtoConverter::toTagDto)
                .collect(Collectors.toList()));
        return dto;
    }

    public static Tag toTagDto(Tag tag) {
        Tag dto = new Tag();
        dto.setId(tag.getId());
        dto.setName(tag.getName());
        return dto;
    }

    private static Detail toDetailDto(Detail detail) {
        Detail dto = new Detail();
        dto.setId(detail.getId());
        dto.setDescription(detail.getDescription());
        dto.setFilePath(detail.getFilePath());
        return dto;
    }

    public static Department toDepartmentDto(Department department) {
        Department dto = new Department();
        dto.setId(department.getId());
        dto.setName(department.getName());
        return dto;
    }

    public static Proportion toProportionDto(Proportion proportion) {
        Proportion dto = new Proportion();
        dto.setId(proportion.getId());
        dto.setNorma(proportion.getNorma());
        dto.setIngredient(toIngridientDto(proportion.getIngredient()));
        return dto;
    }

    public static Ingredient toIngridientDto(Ingredient ingredient) {
        Ingredient dto = new Ingredient();
        dto.setId(ingredient.getId());
        dto.setName(ingredient.getName());
        return dto;
    }
}
