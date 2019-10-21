package com.anna.recept.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.anna.recept.entity.IngredientRef;

public interface IngredientRefRepository extends JpaRepository<IngredientRef, Long> {
	List<IngredientRef> findByParentIngredientIdIn (List<Long> ingredientIds);
}
