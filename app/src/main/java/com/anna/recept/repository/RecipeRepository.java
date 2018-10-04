package com.anna.recept.repository;

import com.anna.recept.entity.Department;
import com.anna.recept.entity.Recipe;
import com.anna.recept.entity.Tag;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecipeRepository extends JpaRepository<Recipe, Long> {

   // @Query("select distinct room.type from Room room")
    Recipe findByName(String name);

    List<Recipe> findByTags(Tag tag);

    List<Recipe> findByDepartment(Department department);
}
