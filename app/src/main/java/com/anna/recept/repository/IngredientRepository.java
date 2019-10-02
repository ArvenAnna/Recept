package com.anna.recept.repository;

import com.anna.recept.entity.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IngredientRepository extends JpaRepository<Ingredient, Long>{

    Ingredient findByNameIgnoreCase(String name);

    List<Ingredient> findByNameIgnoreCaseContaining(String str);

}
