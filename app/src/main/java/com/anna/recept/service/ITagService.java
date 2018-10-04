package com.anna.recept.service;

import com.anna.recept.entity.Recipe;
import com.anna.recept.entity.Tag;

import java.util.List;

public interface ITagService {

    List<Tag> findTags();

    List<Tag> findTagsByRecipe(Long recipeId);

    List<Recipe> findRecipesByTag(Integer tagId);

    Tag createTag(Tag tag);

    void removeTag(Integer tagId);

    Recipe addTagsToRecipe(Long recipeId, List<Integer> tagId);

    Recipe deleteTagsFromRecipe(Long recipeId, List<Integer> tagIds);
}
