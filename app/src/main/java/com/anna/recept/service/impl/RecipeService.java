package com.anna.recept.service.impl;

import com.anna.recept.converter.DtoConverter;
import com.anna.recept.entity.Recipe;
import com.anna.recept.exception.Errors;
import com.anna.recept.exception.RecipeApplicationException;
import com.anna.recept.repository.DepartmentRepository;
import com.anna.recept.repository.RecipeRepository;
import com.anna.recept.repository.TagRepository;
import com.anna.recept.service.IRecipeService;

import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
public class RecipeService implements IRecipeService
{

	private static final Integer ALL_RECEPTS_FETCH_FLAG = -1;

	@Autowired
	private RecipeRepository recipeRep;

	@Autowired
	private TagRepository tagRep;

	@Autowired
	private DepartmentRepository departmentRep;

	@Autowired
	private FileService fileService;

	//    @Autowired
	//    private IAutoCompleteService autocompleteService;

	@Override
	@Transactional
	public Recipe getRecipe(Long receptId) {
		return DtoConverter.withChildren(recipeRep.findOne(receptId));
	}

	@Override
	public void removeRecipe(Long recipeId) {
		recipeRep.delete(recipeId);
	}

	@Override
	@Transactional
	public List<Recipe> showRecipes() {
		return recipeRep.findAll();
	}

	@Override
	@Transactional
	public List<Recipe> showReceptDtos(Integer departId) {
//		List<Recipe> recipes;
//		//TODO: remove this logic -1
//		if (ALL_RECEPTS_FETCH_FLAG.equals(departId)) {
//			recipes = recipeRep.findAll();
//		} else {
//			recipes = departmentRep.findOne(departId).getRecipes();
//		}
//		return recipes.stream().map(recept -> DtoConverter.toReceptDto(recept)).collect(Collectors.toList());

		return null;
	}

	@Override
	public Recipe getRecept(Long receptId) {
		return recipeRep.findOne(receptId);
	}

	@Override
	@Transactional
	public Recipe saveRecipe(Recipe recipe) throws IOException {
		Assert.notNull(recipe, Errors.REQUEST_MUST_NOT_BE_NULL.getCause());
		Assert.notNull(recipe.getName(), Errors.RECIPE_NAME_NULL.getCause());
		Assert.notNull(recipe.getDepartment(), Errors.RECIPE_DEPART_NULL.getCause());
		Assert.isNull(recipe.getId(), Errors.ID_MUST_BE_NULL.getCause());

//		if (recipe.getId() != null) {
//			updateRecept(recipe);
//			return recipe.getId();
//		}

		Recipe recipeWithSameName = recipeRep.findByName(recipe.getName());
		if (recipeWithSameName != null) {
			throw new RecipeApplicationException(Errors.RECIPE_NAME_NOT_UNIQUE);
		}

		return recipeRep.saveAndFlush(recipe);





//		recipe.getProportions().forEach(proportion -> proportion.setRecipe(recipe));
//		List<Recipe> refs = recipe.getRefs().stream().map(ref -> recipeRep.findOne(ref.getId())).collect(Collectors.toList());
//		recipe.setRefs(refs);
//		List<Tag> tags = recipe.getTags().stream().map(tag -> tagRep.findOne(tag.getId())).collect(Collectors.toList());
//		recipe.setTags(tags);
//		//tags.forEach(tag -> tag.getRecipes().add(recipe));
//		recipe.getDetails().stream().forEach(detail -> {
//			detail.setRecipe(recipe);
//			detail.setFilePath(saveFileAndGetPath(detail.getFilePath(), recipe));
//			detail.setRecipe(recipe);
//		});
//
//		String fileName =
//				departmentRep.findOne(recipe.getDepartment().getId()).getName() + File.separator + recipe.getName() + File.separator + recipe
//						.getName() + ".png";
//
//		if (recipe.getImgPath() != null) {
//			recipe.setImgPath(fileService.saveRealFile(recipe.getImgPath(), fileName));
//		}
//
//		if ((recipe.getId() == null && isUniqueReceptName(recipe.getName()))
//				|| recipe.getId() != null) {
//			recipeRep.save(recipe);
//			fileService.cleanTempFiles();
//			return recipe.getId();
//		}
		//throw new RecipeApplicationException(Errors.RECIPE_NAME_NOT_UNIQUE);
	}

	private void updateRecept(Recipe recipe) throws IOException {
//		String fileName =
//				departmentRep.findOne(recipe.getDepartment().getId()).getName() + File.separator + recipe.getName() + File.separator + recipe
//						.getName() + UUID.randomUUID().toString() + ".png";
//
//		Recipe newRecipe = recipeRep.findOne(recipe.getId());
//		newRecipe.setName(recipe.getName());
//		newRecipe.setText(recipe.getText());
//
//		// department
//		if (recipe.getDepartment().getId() != newRecipe.getDepartment().getId()) {
//			Department d = new Department();
//			d.setId(recipe.getDepartment().getId());
//			newRecipe.setDepartment(d);
//		}
//		// file path
//		if (recipe.getImgPath() == null) {
//			newRecipe.setImgPath(null);
//		} else if (!recipe.getImgPath().equals(newRecipe.getImgPath())) {
//			newRecipe.setImgPath(fileService.saveRealFile(recipe.getImgPath(), fileName));
//		}
//
//		//refs
//		MergeObjects.deleteItemsNotPresentInSecond(newRecipe.getRefs(), recipe.getRefs());
//		List<Recipe> refsToAdd = MergeObjects.getItemsNotPresentInSecond(recipe.getRefs(), newRecipe.getRefs());
//		refsToAdd.forEach(ref -> {
//			newRecipe.getRefs().add(recipeRep.findOne(ref.getId()));
//		});
//
//		//tags
//		MergeObjects.deleteItemsNotPresentInSecond(newRecipe.getTags(), recipe.getTags());
//		List<Tag> tagsToAdd = MergeObjects.getItemsNotPresentInSecond(recipe.getTags(), newRecipe.getTags());
//		tagsToAdd.forEach(tag -> {
//			newRecipe.getTags().add(tagRep.findOne(tag.getId()));
//		});
//
//		//proportions
//
//		MergeObjects.deleteItemsNotPresentInSecond(newRecipe.getProportions(), recipe.getProportions());
//		List<Proportion> proportionsToAdd = MergeObjects.getItemsNotPresentInSecond(recipe.getProportions(), newRecipe.getProportions());
//		proportionsToAdd.forEach(prop -> {
//			prop.setRecipe(newRecipe);
//			newRecipe.getProportions().add(prop);
//		});
//
//		//details
//		List<Detail> detailsToDelete = MergeObjects.getItemsNotPresentInSecond(newRecipe.getDetails(), recipe.getDetails());
//		for (Detail detail : detailsToDelete) {
//			fileService.deleteRealFile(detail.getFilePath());
//		}
//		MergeObjects.deleteItemsNotPresentInSecond(newRecipe.getDetails(), recipe.getDetails());
//		List<Detail> detailsToAdd = MergeObjects.getItemsNotPresentInSecond(recipe.getDetails(), newRecipe.getDetails());
//		detailsToAdd.forEach(detail -> {
//			detail.setFilePath(saveFileAndGetPath(detail.getFilePath(), recipe));
//			detail.setRecipe(recipe);
//			detail.setRecipe(newRecipe);
//			newRecipe.getDetails().add(detail);
//		});
//
//		recipeRep.saveAndFlush(newRecipe);
	}

	private String saveFileAndGetPath(String tempPath, Recipe recipe) {
		if (tempPath != null) {
			String detailFileName =
					departmentRep.findOne(recipe.getDepartment().getId()).getName() + File.separator + recipe.getName() + File.separator + recipe
							.getName() + UUID.randomUUID().toString() + ".png";
			try {
				return fileService.saveRealFile(tempPath, detailFileName);
			}
			catch (IOException e) {
				e.printStackTrace();
			}
		}
		return null;
	}

	@Override
	@Transactional
	public void saveFilePath(Long receptId, String path) {
		Recipe recipe = recipeRep.findOne(receptId);
		recipe.setImgPath(path);
		recipeRep.save(recipe);
	}

	@Override
	@Transactional
	public List<Recipe> showReceptsByTag(Integer tagId) {
		throw new UnsupportedOperationException();
		//return tagRep.findOne(tagId).getRecipes();
	}

	@Override
	public Recipe getRecept(String name) {
		return recipeRep.findByName(name);
	}

	private boolean isUniqueReceptName(String name) {
		//return recipeRep.findByName(name).isEmpty();
		return false;
	}
}
