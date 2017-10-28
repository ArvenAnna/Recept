package com.anna.recept.repository;

import com.anna.recept.entity.Recept;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReceptRepository extends JpaRepository<Recept, Integer> {

   // @Query("select distinct room.type from Room room")
    List<Recept> findByName(String name);
}
