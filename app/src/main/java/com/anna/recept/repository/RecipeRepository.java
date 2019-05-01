package com.anna.recept.repository;

import com.anna.recept.entity.Department;
import com.anna.recept.entity.Recipe;
import com.anna.recept.entity.Tag;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RecipeRepository extends JpaRepository<Recipe, Long> {

   // @Query("select distinct room.type from Room room")
    boolean existsByNameIgnoreCase(String name);

    Recipe findByNameIgnoreCase(String name);

    List<Recipe> findByTags(Tag tag);

    List<Recipe> findByDepartment(Department department);

    @Query("select distinct recipe from Recipe recipe, Proportion prop, Ingredient ing where prop.recipe = recipe and prop.ingredient = ing and ing.id in :ingIds")
    List<Recipe> findByIngredients(@Param("ingIds") List<Long> ingIds);

    @Query("select recipe from Recipe recipe where recipe.name like %:keyword% or recipe.text like %:keyword%")
    List<Recipe> findByKeyword(@Param("keyword") String keyword);
}
