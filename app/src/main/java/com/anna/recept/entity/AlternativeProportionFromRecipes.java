package com.anna.recept.entity;

import com.anna.recept.dto.ProportionDto;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Getter
@Setter
@EqualsAndHashCode(of = {"id"})
@Entity
@Table(name = "alternative_proportion_from_recipes")
public class AlternativeProportionFromRecipes extends BaseAlternativeProportion {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "recipe_id")
    private Recipe recipe;

    public static AlternativeProportionFromRecipes of(ProportionDto.AlternativeProportionFromRecipesDto dto) {
        AlternativeProportionFromRecipes proportion = new AlternativeProportionFromRecipes();
        proportion.setId(dto.getId());
        proportion.setNorma(dto.getNorma());

        Recipe recipe = new Recipe();
        recipe.setId(dto.getRecipeId());

        proportion.setRecipe(recipe);
        return proportion;
    }

    public static AlternativeProportionFromRecipes of(ProportionDto.AlternativeProportionFromRecipesDto dto, Proportion proportion) {
        AlternativeProportionFromRecipes altProportion = of(dto);
        altProportion.setProportion(proportion);
        return altProportion;
    }
}
