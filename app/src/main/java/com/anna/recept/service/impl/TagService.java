package com.anna.recept.service.impl;

import com.anna.recept.entity.Recipe;
import com.anna.recept.entity.Tag;
import com.anna.recept.exception.Errors;
import com.anna.recept.repository.RecipeRepository;
import com.anna.recept.repository.TagRepository;
import com.anna.recept.service.ITagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;

import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

@Service
public class TagService implements ITagService {

    @Autowired
    private TagRepository tagRep;
    @Autowired
    private RecipeRepository recipeRep;

    @Override
    public List<Tag> findTags() {
        return tagRep.findAll();
    }

    @Override
    public List<Tag> findTagsByRecipe(Long recipeId) {
        Recipe recipe = recipeRep.findOne(recipeId);
        if (recipe == null) {
            throw new EntityNotFoundException(Errors.RECIPE_NOT_FOUND.getCause());
        }
        return recipe.getTags();
    }

    @Override
    public List<Recipe> findRecipesByTag(Integer tagId) {
        Tag tag = tagRep.findOne(tagId);
        if (tag == null) {
            throw new EntityNotFoundException(Errors.TAG_NOT_FOUND.getCause());
        }
        return recipeRep.findByTags(tag);
    }

    @Override
    @Transactional
    public Tag createTag(Tag tag) {
        Assert.notNull(tag, Errors.REQUEST_MUST_NOT_BE_NULL.getCause());
        Assert.isNull(tag.getId(), Errors.ID_MUST_BE_NULL.getCause());
        return tagRep.saveAndFlush(tag);
    }

    @Override
    @Transactional
    public void removeTag(Integer tagId) {
        Tag tag = tagRep.findOne(tagId);
        if (tag == null) {
            throw new EntityNotFoundException(Errors.TAG_NOT_FOUND.getCause());
        }
        tagRep.delete(tag);
    }

    @Override
    @Transactional
    public Recipe addTagsToRecipe(Long recipeId, List<Integer> tagIds) {
        Recipe recipe = recipeRep.findOne(recipeId);
        if (recipe == null) {
            throw new EntityNotFoundException(Errors.RECIPE_NOT_FOUND.getCause());
        }
        List<Tag> tags = tagRep.findAll(tagIds);
        recipe.getTags().addAll(tags);
        recipeRep.flush();
        return recipe;
    }

    @Override
    @Transactional
    public Recipe deleteTagsFromRecipe(Long recipeId, List<Integer> tagIds) {
        Recipe recipe = recipeRep.findOne(recipeId);
        if (recipe == null) {
            throw new EntityNotFoundException(Errors.RECIPE_NOT_FOUND.getCause());
        }

        List<Tag> tagsToRemove = recipe.getTags().stream()
                .filter(tag -> tagIds.contains(tag.getId())).collect(Collectors.toList());

        recipe.getTags().removeAll(tagsToRemove);
        recipeRep.flush();
        return recipe;
    }
}
