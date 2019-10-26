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
@Table(name = "alternative_proportion")
public class AlternativeProportion extends BaseAlternativeProportion {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "ingredient_id")
    private Ingredient ingredient;

    public static AlternativeProportion of(ProportionDto.AlternativeProportionDto dto) {
        AlternativeProportion proportion = new AlternativeProportion();
        proportion.setId(dto.getId());
        proportion.setNorma(dto.getNorma());

        Ingredient ingredient = new Ingredient();
        ingredient.setId(dto.getIngredientId());

        proportion.setIngredient(ingredient);
        return proportion;
    }

    public static AlternativeProportion of(ProportionDto.AlternativeProportionDto dto, Proportion proportion) {
        AlternativeProportion altProportion = of(dto);
        altProportion.setProportion(proportion);
        return altProportion;
    }
}
