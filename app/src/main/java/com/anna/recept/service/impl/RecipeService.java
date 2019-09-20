package com.anna.recept.service.impl;

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
import com.anna.recept.utils.FilePathUtils;

import org.apache.commons.collections.ListUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;

import java.io.File;
import java.io.IOException;
import java.io.UncheckedIOException;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

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
	@Transactional // due to Lazy context
	public List<RecipeDto> getRecipes() {
		return recipeRep.findAll().stream()
				.map(RecipeDto::withBasicFields)
				.collect(Collectors.toList());
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
		//todo: also delete small copies
		fileService.deleteRealFile(recipe.getImgPath());
		recipe.getDetails().stream().forEach(detail -> {
			fileService.deleteRealFile(detail.getFilePath());
		});
	}

	private String saveRecipeFile(String path, Recipe recipe) {
		Assert.notNull(recipe.getDepartment(), "department should be fetched before accessing it");
		Assert.notNull(recipe.getDepartment().getName(), "department should be fetched before accessing it");

		String catalog = recipe.getDepartment().getName();
		String subCatalog = recipe.getName();

		return FilePathUtils.isTempPath(path)
				? saveFileAndGetPath(path, FilePathUtils.constructPathWithCatalogsToRealFile(path, catalog, subCatalog, null),
				FilePathUtils.constructPathWithCatalogsToRealFile(path, catalog, subCatalog, "small"))
				: replaceFileIfNeededAndGetPath(path, catalog, subCatalog);
	}

	private String saveFileAndGetPath(String tempPath, String newFileName, String smallFileName) {
			try {
				fileService.saveNormalAndSmallFiles(tempPath, newFileName, smallFileName);
//				fileService.saveRealFile(tempPath, newFileName);
//				fileService.saveRealFileAndResize(tempPath, smallFileName);
				return newFileName;
			}
			catch (IOException e) {
				//todo check if it is not saved process some another way
				throw new UncheckedIOException(e);
			}
	}

	private String replaceFileIfNeededAndGetPath(String path, String catalog, String subCatalog) {
		String newCatalogName = FilePathUtils.constructCatalogName(catalog, subCatalog);
		String changedFilePath = FilePathUtils.getChangedCatalogsInPath(path, newCatalogName);
		if (path != null && !path.equals(changedFilePath)) {
			fileService.replaceFilesInCatalog(FilePathUtils.extractCatalogFromPath(path), newCatalogName);
			return changedFilePath;
		}
		return path;
	}

	@Override
	public List<RecipeDto> findRecipesByParams(SearchRecipeParams params) {
		List<Recipe> recipes = null;

		//TODO: write it by one query
		String searchString = params.getSearch() == null ? "" : params.getSearch();

		if (!params.getIngredients().isEmpty()) {
			recipes = recipeRep.findBySearchParams(searchString, params.getIngredients());
		} else {
			recipes = recipeRep.findByKeyword(searchString);
		}

		if (!params.getRefs().isEmpty()) {
			recipes = recipes.stream()
					.filter(recipe -> {
						List<Long> refIds = recipe.getRefs().stream()
								.map(ref -> ref.getId()).collect(Collectors.toList());
						return refIds.containsAll(params.getRefs());
					})
					.collect(Collectors.toList());
		}

		return recipes.stream().map(RecipeDto::withBasicFields).collect(Collectors.toList());
	}


	@Override
	public List<RecipeDto> findRecipesNameByKeyword(String keyword) {
		return recipeRep.findByNameContainingIgnoreCase(keyword).stream()
				.limit(10L)
				.map(RecipeDto::withBasicFields).collect(Collectors.toList());
	}
}
