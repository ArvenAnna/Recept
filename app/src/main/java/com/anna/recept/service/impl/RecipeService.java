package com.anna.recept.service.impl;

import com.anna.recept.dto.RecipeDto;
import com.anna.recept.entity.Recipe;
import com.anna.recept.exception.Errors;
import com.anna.recept.exception.RecipeApplicationException;
import com.anna.recept.repository.DepartmentRepository;
import com.anna.recept.repository.IngredientRepository;
import com.anna.recept.repository.RecipeRepository;
import com.anna.recept.repository.TagRepository;
import com.anna.recept.service.IRecipeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

@Service
public class RecipeService implements IRecipeService
{

	public static final String DEFAULT_EXTENSION = "png";
	@Autowired
	private RecipeRepository recipeRep;

	@Autowired
	private IngredientRepository ingRep;

	@Autowired
	private TagRepository tagRep;

	@Autowired
	private DepartmentRepository departmentRep;

	@Autowired
	private FileService fileService;

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
	@Transactional // due to Lazy context
	public List<RecipeDto> getRecipes() {
		return recipeRep.findAll().stream()
				.map(RecipeDto::withBasicFields)
				.collect(Collectors.toList());
	}

	@Override
	@Transactional
	public RecipeDto saveRecipe(RecipeDto recipe) {
//		Assert.notNull(recipe, Errors.REQUEST_MUST_NOT_BE_NULL.getCause());
//		Assert.notNull(recipe.getName(), Errors.RECIPE_NAME_NULL.getCause());
//		Assert.notNull(recipe.getDepartment(), Errors.RECIPE_DEPART_NULL.getCause()); //also check depart id is not null and existent
		Assert.isNull(recipe.getId(), Errors.ID_MUST_BE_NULL.getCause());

		if (recipeRep.existsByNameIgnoreCase(recipe.getName())) {
			throw new RecipeApplicationException(Errors.RECIPE_NAME_NOT_UNIQUE);
		}

		return convertAndSave(recipe);
	}

	@Override
	@Transactional
	public RecipeDto updateRecipe(RecipeDto recipe) {
//		Assert.notNull(recipe, Errors.REQUEST_MUST_NOT_BE_NULL.getCause());
//		Assert.notNull(recipe.getName(), Errors.RECIPE_NAME_NULL.getCause());
//		Assert.notNull(recipe.getDepartment(), Errors.RECIPE_DEPART_NULL.getCause()); //also check depart id is not null and existent
		Assert.notNull(recipe.getId(), Errors.ID_MUST_NOT_BE_NULL.getCause());

		Recipe recipeWithSameName = recipeRep.findByNameIgnoreCase(recipe.getName());
		if (recipeWithSameName != null && recipeWithSameName.getId() != recipe.getId()) {
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

		recipeEntity.getProportions().stream().forEach(prop ->
			prop.setIngredient(ingRep.findById(prop.getIngredient().getId())
					.orElseThrow(() -> new EntityNotFoundException(Errors.INGREDIENT_NOT_FOUND.getCause())))
		);
		recipeEntity.setRefs(recipeEntity.getRefs().stream().map(ref ->
				recipeRep.findById(ref.getId())
						.orElseThrow(() -> new EntityNotFoundException(Errors.RECIPE_NOT_FOUND.getCause()))
		).collect(Collectors.toList()));

		recipeEntity.setTags(recipeEntity.getTags().stream().map(tag ->
				tagRep.findById(tag.getId())
						.orElseThrow(() -> new EntityNotFoundException(Errors.TAG_NOT_FOUND.getCause()))
		).collect(Collectors.toList()));
	}

	private void saveAllFiles(Recipe recipe) {
		recipe.setImgPath(saveRecipeFile(recipe.getImgPath(), recipe));
		recipe.getDetails().stream().forEach(detail -> {
			detail.setFilePath(saveRecipeFile(detail.getFilePath(), recipe));
		});
	}

	private void removeAllFiles(Recipe recipe) {
		fileService.deleteRealFile(recipe.getImgPath());
		recipe.getDetails().stream().forEach(detail -> {
			fileService.deleteRealFile(detail.getFilePath());
		});
	}

	private String saveRecipeFile(String tempPath, Recipe recipe) {
		Assert.notNull(recipe.getDepartment(), "department should be fetched before accessing it");
		Assert.notNull(recipe.getDepartment().getName(), "department should be fetched before accessing it");

		String name = constructFullFileName(tempPath, recipe);

		return isRealPath(tempPath, recipe)
				? tempPath
				: saveFileAndGetPath(tempPath, name);
	}

	private boolean isRealPath(String path, Recipe recipe) {
		return path == null || path.contains(constructConstantFileNamePart(recipe));
	}

	private String saveFileAndGetPath(String tempPath, String newFileName) {
			try {
				return fileService.saveRealFile(tempPath, newFileName);
			}
			catch (IOException e) {
				e.printStackTrace();
			}
			return null;
	}

	private String constructFullFileName(String tempPath, Recipe recipe) {
		String[] pathFragments = tempPath.split("\\.");
		String extension = pathFragments.length <= 1
				? DEFAULT_EXTENSION
				: pathFragments[pathFragments.length - 1];
		return constructConstantFileNamePart(recipe) + UUID.randomUUID().toString() + "." + extension;
	}

	private String constructConstantFileNamePart(Recipe recipe) {
		String catalogName = recipe.getDepartment().getName();
		String subCatalogName = recipe.getName();
		return catalogName + File.separator
				+ subCatalogName + File.separator
				+ subCatalogName;
	}

	@Override
	@Transactional
	public RecipeDto addRefsToRecipe(Long recipeId, List<Long> refIds) {
		Recipe recipe = recipeRep.findById(recipeId).orElseThrow(() -> new EntityNotFoundException(Errors.RECIPE_NOT_FOUND.getCause()));
		List<Recipe> recipes = recipeRep.findAllById(refIds);
		recipe.getRefs().addAll(recipes);
		return RecipeDto.withAllFields(recipeRep.saveAndFlush(recipe));
	}

	@Override
	@Transactional
	public RecipeDto deleteRefsFromRecipe(Long recipeId, List<Long> refIds) {
		Recipe recipe = recipeRep.findById(recipeId).orElseThrow(() -> new EntityNotFoundException(Errors.RECIPE_NOT_FOUND.getCause()));
		List<Recipe> recipesToRemove = recipe.getRefs().stream()
				.filter(ref -> refIds.contains(ref.getId())).collect(Collectors.toList());

		recipe.getRefs().removeAll(recipesToRemove);
		return RecipeDto.withAllFields(recipeRep.saveAndFlush(recipe));
	}

	@Override
	public List<RecipeDto> findRecipesByIngredients(List<Long> ingIds) {
		return recipeRep.findByIngredients(ingIds).stream().map(RecipeDto::withBasicFields).collect(Collectors.toList());
	}

	@Override
	public List<RecipeDto> findRecipesByKeyword(String keyword) {
		return recipeRep.findByKeyword(keyword).stream().map(RecipeDto::withBasicFields).collect(Collectors.toList());
	}

}
