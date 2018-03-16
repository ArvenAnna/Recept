package com.anna.recept.repository;

import com.anna.recept.entity.Detail;
import com.anna.recept.entity.Recept;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface DetailRepository extends JpaRepository<Detail, Integer> {

    @Query("select detail.recept from Detail detail where detail.id = :id")
    Recept findReceptByDetail(@Param("id") Integer detailId);
}
