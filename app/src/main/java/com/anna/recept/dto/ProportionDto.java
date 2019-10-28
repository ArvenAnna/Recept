package com.anna.recept.dto;

import com.anna.recept.entity.AlternativeProportion;
import com.anna.recept.entity.AlternativeProportionFromRecipes;
import com.anna.recept.entity.Ingredient;
import com.anna.recept.entity.Proportion;
import com.anna.recept.entity.Recipe;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ProportionDto {

    private Long id;
    private String norma;
    private Long ingredientId;
    private String ingredientName;
    private boolean optional;
    private List<AlternativeProportionDto> alternativeProportions;
    private List<AlternativeProportionFromRecipesDto> alternativeRefs;

    @Builder
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AlternativeProportionDto {
        private Long id;
        private String norma;
        private Long ingredientId;
        private String ingredientName;

        public static AlternativeProportionDto of(AlternativeProportion proportion) {
            return AlternativeProportionDto.builder()
                    .id(proportion.getId())
                    .norma(proportion.getNorma())
                    .ingredientId(Optional.ofNullable(proportion.getIngredient()).map(Ingredient::getId).orElse(null))
                    .ingredientName(Optional.ofNullable(proportion.getIngredient()).map(Ingredient::getName).orElse(null))
                    .build();
        }
    }

    @Builder
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AlternativeProportionFromRecipesDto {
        private Long id;
        private String norma;
        private Long recipeId;
        private String recipeName;

        public static AlternativeProportionFromRecipesDto of(AlternativeProportionFromRecipes proportion) {
            return AlternativeProportionFromRecipesDto.builder()
                    .id(proportion.getId())
                    .norma(proportion.getNorma())
                    .recipeId(Optional.ofNullable(proportion.getRecipe()).map(Recipe::getId).orElse(null))
                    .recipeName(Optional.ofNullable(proportion.getRecipe()).map(Recipe::getName).orElse(null))
                    .build();
        }
    }

    public static ProportionDto of(Proportion proportion) {
        return ProportionDto.builder()
                .id(proportion.getId())
                .norma(proportion.getNorma())
                .ingredientId(Optional.ofNullable(proportion.getIngredient()).map(Ingredient::getId).orElse(null))
                .ingredientName(Optional.ofNullable(proportion.getIngredient()).map(Ingredient::getName).orElse(null))
                .optional(proportion.isOptional())
                .alternativeProportions(Optional.ofNullable(proportion.getAlternativeProportions())
                        .map(altProps -> altProps.stream().map(AlternativeProportionDto::of).collect(Collectors.toList()))
                        .orElse(null))
                .alternativeRefs(Optional.ofNullable(proportion.getAlternativeProportionsFromRecipes())
                        .map(altProps -> altProps.stream().map(AlternativeProportionFromRecipesDto::of).collect(Collectors.toList()))
                        .orElse(null))
                .build();
    }
}
