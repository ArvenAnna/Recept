package com.anna.recept.service;

import com.anna.recept.entity.Tag;

import java.util.List;

public interface ITagService {
    List<Tag> findTags();
    List<Tag> findTagsByRecept(Integer receptId);

    void saveCategory(Integer receptId, Integer tagId);

    void deleteTagFromRecept(Integer receptId, Integer tagId);
}
