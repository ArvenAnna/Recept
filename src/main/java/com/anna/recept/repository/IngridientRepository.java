package com.anna.recept.repository;

import com.anna.recept.entity.Ingridient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IngridientRepository extends JpaRepository<Ingridient, Integer>{

    List<Ingridient> findByNameIgnoreCase(String name);

}
