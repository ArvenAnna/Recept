package com.anna.recept.repository;

import com.anna.recept.entity.Detail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DetailRepository extends JpaRepository<Detail, Integer> {

//    @Query("select detail.recipe from Detail detail where detail.id = :id")
//	Recipe findReceptByDetail(@Param("id") Integer detailId);
}
