package com.anna.recept.repository;

import com.anna.recept.entity.Recipe;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReceptRepository extends JpaRepository<Recipe, Integer> {

   // @Query("select distinct room.type from Room room")
    List<Recipe> findByName(String name);
}
