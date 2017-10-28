package com.anna.recept.repository;

import com.anna.recept.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TagRepository extends JpaRepository<Tag, Integer> {

 //   @Query("select tag from Tag tag where tag.")
//
//    void deleteTagFromRecept(Integer receptId, Integer tagId);
}
