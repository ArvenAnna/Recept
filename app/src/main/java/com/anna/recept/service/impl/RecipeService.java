package com.anna.recept.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;
import org.springframework.validation.annotation.Validated;

import com.anna.recept.dto.RecipeDto;
import com.anna.recept.dto.SearchRecipeParams;
import com.anna.recept.entity.Recipe;
import com.anna.recept.exception.Errors;
import com.anna.recept.exception.RecipeApplicationException;
import com.anna.recept.repository.DepartmentRepository;
import com.anna.recept.repository.IngredientRepository;
import com.anna.recept.repository.RecipeRepository;
import com.anna.recept.repository.TagRepository;
import com.anna.recept.service.IRecipeService;

@Validated
@Service
public class RecipeService implements IRecipeService {

	@Autowired
	private RecipeRepository recipeRep;

	@Autowired
	private IngredientRepository ingRep;

	@Autowired
	private TagRepository tagRep;

	@Autowired
	private DepartmentRepository departmentRep;

	@Autowired
	private com.anna.recept.service.impl.FileService fileService;

	@Override
	@Transactional // due to Lazy context
	public RecipeDto getRecipe(Long recipeId) {
		return recipeRep.findById(recipeId)
				.map(RecipeDto::withAllFields)
				.orElseThrow(() -> new EntityNotFoundException(Errors.RECIPE_NOT_FOUND.getCause()));
	}

	@Override
	@Transactional // due to check-then-act
	public void removeRecipe(Long recipeId) {
		if (!recipeRep.existsById(recipeId)) {
			throw new EntityNotFoundException(Errors.RECIPE_NOT_FOUND.getCause());
		}
		recipeRep.findById(recipeId).ifPresent(recipe -> {
			removeAllFiles(recipe);
			recipeRep.delete(recipe);
		});
	}

	@Override
	@Transactional
	public RecipeDto saveRecipe(RecipeDto recipe) {
		Assert.notNull(recipe, Errors.REQUEST_MUST_NOT_BE_NULL.getCause());
		Assert.notNull(recipe.getName(), Errors.RECIPE_NAME_NULL.getCause());
		Assert.notNull(recipe.getDepartment(), Errors.RECIPE_DEPART_NULL.getCause()); //also check depart id is not null and existent
		Assert.isNull(recipe.getId(), Errors.ID_MUST_BE_NULL.getCause());

		if (recipeRep.existsByNameIgnoreCase(recipe.getName())) {
			throw new RecipeApplicationException(Errors.RECIPE_NAME_NOT_UNIQUE);
		}

		return convertAndSave(recipe);
	}

	@Override
	@Transactional
	public RecipeDto updateRecipe(RecipeDto recipe) {
		Assert.notNull(recipe, Errors.REQUEST_MUST_NOT_BE_NULL.getCause());
		Assert.notNull(recipe.getName(), Errors.RECIPE_NAME_NULL.getCause());
		Assert.notNull(recipe.getDepartment(), Errors.RECIPE_DEPART_NULL.getCause()); //also check depart id is not null and existent
		Assert.notNull(recipe.getId(), Errors.ID_MUST_NOT_BE_NULL.getCause());

		Recipe recipeWithSameName = recipeRep.findByNameIgnoreCase(recipe.getName());
		if (recipeWithSameName != null && !recipeWithSameName.getId().equals(recipe.getId())) {
			throw new RecipeApplicationException(Errors.RECIPE_NAME_NOT_UNIQUE);
		}

		return convertAndSave(recipe);
	}

	private RecipeDto convertAndSave(RecipeDto recipe) {
		Recipe recipeEntity = Recipe.of(recipe);

		setPersistentBounds(recipeEntity);
		saveAllFiles(recipeEntity);

		return RecipeDto.withAllFields(recipeRep.saveAndFlush(recipeEntity));
	}

	private void setPersistentBounds(Recipe recipeEntity) {
		recipeEntity.setDepartment(departmentRep.findById(recipeEntity.getDepartment().getId())
				.orElseThrow(() -> new EntityNotFoundException(Errors.DEPART_NOT_EXISTS.getCause())));

		// check if it is needed
//		recipeEntity.getProportions().stream().forEach(prop ->
//			prop.setIngredient(ingRep.findById(prop.getIngredient().getId())
//					.orElseThrow(() -> new EntityNotFoundException(Errors.INGREDIENT_NOT_FOUND.getCause())))
//		);
		recipeEntity.getRefs().stream().forEach(ref ->
			ref.setReferenceRecipe(recipeRep.findById(ref.getReferenceRecipe().getId()).orElseThrow(() -> new EntityNotFoundException(Errors.RECIPE_NOT_FOUND.getCause()))));

		recipeEntity.setTags(recipeEntity.getTags().stream().map(tag ->
				tagRep.findById(tag.getId())
						.orElseThrow(() -> new EntityNotFoundException(Errors.TAG_NOT_FOUND.getCause()))
		).collect(Collectors.toList()));
	}

	private void saveAllFiles(Recipe recipe) {
		recipe.setImgPath(saveRecipeFile(recipe.getImgPath(), recipe));
		recipe.getDetails().stream().forEach(detail ->
				detail.setFilePath(saveRecipeFile(detail.getFilePath(), recipe)));
	}

	private void removeAllFiles(Recipe recipe) {
		fileService.deleteRecipeFolder(recipe.getDepartment().getName(), recipe.getName());
	}

	private String saveRecipeFile(String path, Recipe recipe) {
		Assert.notNull(recipe.getDepartment(), "department should be fetched before accessing it");
		Assert.notNull(recipe.getDepartment().getName(), "department should be fetched before accessing it");

		return fileService.saveRecipeFile(path, recipe.getDepartment().getName(), recipe.getName());
	}

	@Override
	@Transactional // due to Lazy context
	public List<RecipeDto> findRecipesByParams(SearchRecipeParams params) {
		return recipeRep.findRecipesBySearchParams(params).stream()
				.map(RecipeDto::withBasicFields).collect(Collectors.toList());
	}

	@Override
	public List<RecipeDto> findRecipesNameByKeyword(String keyword) {
		return recipeRep.findByNameContainingIgnoreCase(keyword).stream()
				.limit(10L)
				.map(RecipeDto::withBasicFields).collect(Collectors.toList());
	}

	@Override
	public List<RecipeDto> getRecipes(List<Long> ids) {
		return recipeRep.findAllById(ids).stream().map(RecipeDto::withBasicFields).collect(Collectors.toList());
	}
}
