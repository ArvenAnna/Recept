package com.anna.recept.entity;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.anna.recept.dto.RecipeDto;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@EqualsAndHashCode(of = {"id"})
@Entity
@Table(name = "reference")
public class RecipeRef extends BaseRecipeProportion {

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "recept_reference_id")
	private Recipe referenceRecipe;

	public static RecipeRef of (RecipeDto.RefDto dto) {
		RecipeRef ref = new RecipeRef();
		ref.setId(dto.getId());
		ref.setNorma(dto.getNorma());

		Recipe recipe = new Recipe();
		recipe.setId(dto.getRecipeId());
		recipe.setName(dto.getRecipeName());

		ref.setReferenceRecipe(recipe);
		return ref;
	}

	public static RecipeRef of(RecipeDto.RefDto dto, Recipe recipe) {
		RecipeRef ref = of(dto);
		ref.setRecipe(recipe);
		return ref;
	}
}
