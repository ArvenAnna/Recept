package com.anna.recept.entity;

import lombok.*;

import javax.persistence.*;

import com.anna.recept.dto.RecipeDto;

@Getter
@Setter
@EqualsAndHashCode(of = {"id"})
@Entity
@Table(name = "proportion")
public class Proportion extends BaseRecipeRef {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "ingridient_id")
    private Ingredient ingredient;


    public static Proportion of(RecipeDto.ProportionDto dto) {
        Proportion proportion = new Proportion();
        proportion.setId(dto.getId());
        proportion.setNorma(dto.getNorma());

        Ingredient ingredient = new Ingredient();
        ingredient.setId(dto.getIngredientId());
        ingredient.setName(dto.getIngredientName());

        proportion.setIngredient(ingredient);
        return proportion;
    }

    public static Proportion of(RecipeDto.ProportionDto dto, Recipe recipe) {
        Proportion proportion = of(dto);
        proportion.setRecipe(recipe);
        return proportion;
    }
}
