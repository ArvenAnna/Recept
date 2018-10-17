package com.anna.recept.service.impl;

import com.anna.recept.dto.RecipeDto;
import com.anna.recept.entity.Recipe;
import com.anna.recept.entity.Tag;
import com.anna.recept.exception.Errors;
import com.anna.recept.exception.RecipeApplicationException;
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
    @Transactional
    public List<RecipeDto.TagDto> findTagsByRecipe(Long recipeId) {
        Recipe recipe = recipeRep.findById(recipeId)
                .orElseThrow(() -> new EntityNotFoundException(Errors.RECIPE_NOT_FOUND.getCause()));
        return recipe.getTags().stream().map(RecipeDto.TagDto::of).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public List<RecipeDto> findRecipesByTag(Integer tagId) {
        Tag tag = tagRep.findById(tagId).get();
        if (tag == null) {
            throw new EntityNotFoundException(Errors.TAG_NOT_FOUND.getCause());
        }
        return recipeRep.findByTags(tag).stream()
                .map(RecipeDto::withBasicFields)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public Tag createTag(Tag tag) {
        Assert.notNull(tag, Errors.REQUEST_MUST_NOT_BE_NULL.getCause());
        Assert.isNull(tag.getId(), Errors.ID_MUST_BE_NULL.getCause());
        Tag tagWithSameName = tagRep.findByNameIgnoreCase(tag.getName());
        if (tagWithSameName != null) {
            throw new RecipeApplicationException(Errors.TAG_NAME_NOT_UNIQUE);
        }
        return tagRep.saveAndFlush(tag);
    }

    @Override
    @Transactional
    public void removeTag(Integer tagId) {
        Tag tag = tagRep.findById(tagId).get();
        if (tag == null) {
            throw new EntityNotFoundException(Errors.TAG_NOT_FOUND.getCause());
        }
        tagRep.delete(tag);
    }

    @Override
    @Transactional
    public RecipeDto addTagsToRecipe(Long recipeId, List<Integer> tagIds) {
        Recipe recipe = recipeRep.findById(recipeId).get();
        if (recipe == null) {
            throw new EntityNotFoundException(Errors.RECIPE_NOT_FOUND.getCause());
        }
        List<Tag> tags = tagRep.findAllById(tagIds);
        recipe.getTags().addAll(tags);
        recipeRep.flush();
        return RecipeDto.withAllFields(recipe);
    }

    @Override
    @Transactional
    public RecipeDto deleteTagsFromRecipe(Long recipeId, List<Integer> tagIds) {
        Recipe recipe = recipeRep.findById(recipeId).get();
        if (recipe == null) {
            throw new EntityNotFoundException(Errors.RECIPE_NOT_FOUND.getCause());
        }

        List<Tag> tagsToRemove = recipe.getTags().stream()
                .filter(tag -> tagIds.contains(tag.getId())).collect(Collectors.toList());

        recipe.getTags().removeAll(tagsToRemove);
        recipeRep.flush();
        return RecipeDto.withAllFields(recipe);
    }
}
