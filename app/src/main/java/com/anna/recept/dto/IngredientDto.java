package com.anna.recept.dto;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

import com.anna.recept.entity.Ingredient;
import com.anna.recept.entity.IngredientRef;

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
    private List<Long> children;

    public static Ingredient toEntity(IngredientDto dto, String imgPath, Ingredient parent) {
        Ingredient ingredient = new Ingredient();
        ingredient.setId(dto.getId());
        ingredient.setName(dto.getName());
        ingredient.setDescription(dto.getDescription());
        ingredient.setImgPath(imgPath);
        ingredient.setParent(parent);
        return ingredient;
    }

    public static IngredientDto of(Ingredient ing) {
        return IngredientDto.builder()
                .id(ing.getId())
                .name(ing.getName())
                .description(ing.getDescription())
                .imgPath(ing.getImgPath())
                .parent(Optional.ofNullable(ing.getParent()).map(Ingredient::getId).orElse(null))
                .children(Optional.ofNullable(ing.getChildren()).map(children -> children.stream().map(Ingredient::getId).collect(Collectors.toList())).orElse(null))
                .build();
    }

    public static IngredientDto of(Ingredient ing, List<IngredientRef> refs) {
        return IngredientDto.builder()
                .id(ing.getId())
                .name(ing.getName())
                .description(ing.getDescription())
                .imgPath(ing.getImgPath())
                .parent(Optional.ofNullable(ing.getParent()).map(Ingredient::getId).orElse(null))
                .children(Optional.ofNullable(refs).map(r -> r.stream().map(IngredientRef::getIngredientId).collect(Collectors.toList())).orElse(null))
                .build();
    }
}
