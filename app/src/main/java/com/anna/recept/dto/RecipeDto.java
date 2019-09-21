package com.anna.recept.dto;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.validation.constraints.NotNull;

import com.anna.recept.entity.Department;
import com.anna.recept.entity.Detail;
import com.anna.recept.entity.Ingredient;
import com.anna.recept.entity.Proportion;
import com.anna.recept.entity.Recipe;
import com.anna.recept.entity.Tag;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class RecipeDto {
	private Long id;
	@NotNull(message = "Recipe name should not be null")
	private String name;
	@NotNull(message = "Recipe department should not be null")
	private DepartmentDto department;
	@Setter
	private String imgPath;
	private String text;
	private List<DetailDto> details = new ArrayList<>();
	private List<ProportionDto> proportions = new ArrayList<>();
	private List<TagDto> tags = new ArrayList<>();
	private List<RecipeDto> refs = new ArrayList<>();

	@Getter
	@NoArgsConstructor
	@AllArgsConstructor
	public static class DepartmentDto {
		private Long id;
		@NotNull(message = "Department name should not be null")
		private String name;

		public static DepartmentDto of(Department department) {
			return new DepartmentDto(department.getId(), department.getName());
		}
	}

	@Getter
	@NoArgsConstructor
	@AllArgsConstructor
	public static class DetailDto {
		private Long id;
		private String description;
		@Setter
		private String filePath;

		public static DetailDto of(Detail detail) {
			return new DetailDto(detail.getId(), detail.getDescription(), detail.getFilePath());
		}
	}

	@Builder
	@Getter
	@NoArgsConstructor
	@AllArgsConstructor
	public static class ProportionDto {
		private Long id;
		private String norma;
		private Long ingredientId;
		private String ingredientName;

		public static ProportionDto of(Proportion proportion) {
			return ProportionDto.builder()
					.id(proportion.getId())
					.norma(proportion.getNorma())
					.ingredientId(Optional.ofNullable(proportion.getIngredient()).map(Ingredient::getId).orElse(null))
					.ingredientName(Optional.ofNullable(proportion.getIngredient()).map(Ingredient::getName).orElse(null))
					.build();
		}
	}

	@Getter
	@NoArgsConstructor
	@AllArgsConstructor
	public static class TagDto {
		private Integer id;
		@NotNull(message = "Tag name should not be null")
		private String name;

		public static TagDto of(Tag tag) {
			return new TagDto(tag.getId(), tag.getName());
		}
	}

	public static RecipeDto withBasicFields(Recipe recipe) {
		return RecipeDto.withBasicFieldsBuilder(recipe).build();
	}

	public static RecipeDto withAllFields(Recipe recipe) {
		return withAllFieldsBuilder(recipe).build();
	}

	private static RecipeDtoBuilder withBasicFieldsBuilder(Recipe recipe) {
		return RecipeDto.builder()
				.id(recipe.getId())
				.name(recipe.getName())
				.text(recipe.getText())
				.imgPath(recipe.getImgPath())
				.department(DepartmentDto.of(recipe.getDepartment()));
	}

	private static RecipeDtoBuilder withAllFieldsBuilder(Recipe recipe) {
		return RecipeDto.withBasicFieldsBuilder(recipe)
				.details(recipe.getDetails().stream().map(DetailDto::of).collect(Collectors.toList()))
				.proportions(recipe.getProportions().stream().map(ProportionDto::of).collect(Collectors.toList()))
				.tags(recipe.getTags().stream().map(TagDto::of).collect(Collectors.toList()))
				.refs(recipe.getRefs().stream().map(RecipeDto::withBasicFields).collect(Collectors.toList()));
	}

}
