package com.anna.recept.service;

import com.anna.recept.dto.RecipeDto;
import com.anna.recept.entity.Tag;

import java.util.List;

public interface ITagService {

    List<Tag> findTags();

    List<RecipeDto.TagDto> findTagsByRecipe(Long recipeId);

    List<RecipeDto> findRecipesByTag(Integer tagId);

    Tag createTag(Tag tag);

    void removeTag(Integer tagId);

    RecipeDto addTagsToRecipe(Long recipeId, List<Integer> tagId);

    RecipeDto deleteTagsFromRecipe(Long recipeId, List<Integer> tagIds);
}
