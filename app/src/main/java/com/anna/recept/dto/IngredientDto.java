package com.anna.recept.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

import com.anna.recept.entity.Ingredient;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class IngredientDto {
    private Long id;
    @NotNull(message = "Ingredient name should not be null")
    private String name;
    private String description;
    private String imgPath;
    private Long parent;

    public static Ingredient toEntity(IngredientDto dto, String imgPath, Ingredient parent) {
        Ingredient ingredient = new Ingredient();
        ingredient.setName(dto.getName());
        ingredient.setDescription(dto.getDescription());
        ingredient.setImgPath(imgPath);
        ingredient.setParent(parent);
        return ingredient;
    }
}
