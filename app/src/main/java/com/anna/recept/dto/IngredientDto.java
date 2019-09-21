package com.anna.recept.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

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
}
