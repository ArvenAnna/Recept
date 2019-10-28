package com.anna.recept.entity;

import com.anna.recept.dto.ProportionDto;
import lombok.*;

import javax.persistence.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Getter
@Setter
@EqualsAndHashCode(of = {"id"})
@Entity
@Table(name = "proportion")
public class Proportion extends BaseRecipeProportion {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "ingredient_id")
    private Ingredient ingredient;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "proportion")
    private List<AlternativeProportion> alternativeProportions;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "proportion")
    private List<AlternativeProportionFromRecipes> alternativeProportionsFromRecipes;

    public static Proportion of(ProportionDto dto) {
        Proportion proportion = new Proportion();
        proportion.setId(dto.getId());
        proportion.setNorma(dto.getNorma());
        proportion.setOptional(dto.isOptional());

        Ingredient ingredient = new Ingredient();
        ingredient.setId(dto.getIngredientId());
//        ingredient.setName(dto.getIngredientName());

        proportion.setIngredient(ingredient);

        proportion.setAlternativeProportions(Optional.ofNullable(dto.getAlternativeProportions())
                .map(altProps -> altProps.stream().map(altProp -> AlternativeProportion.of(altProp, proportion)).collect(Collectors.toList()))
                .orElse(null));

        proportion.setAlternativeProportionsFromRecipes(Optional.ofNullable(dto.getAlternativeRefs())
                .map(altProps -> altProps.stream().map(altProp -> AlternativeProportionFromRecipes.of(altProp, proportion)).collect(Collectors.toList()))
                .orElse(null));

        return proportion;
    }

    public static Proportion of(ProportionDto dto, Recipe recipe) {
        Proportion proportion = of(dto);
        proportion.setRecipe(recipe);
        return proportion;
    }
}
