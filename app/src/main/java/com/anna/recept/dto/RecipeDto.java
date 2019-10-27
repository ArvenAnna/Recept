package com.anna.recept.dto;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.validation.constraints.NotNull;

import com.anna.recept.entity.Department;
import com.anna.recept.entity.Detail;
import com.anna.recept.entity.Recipe;
import com.anna.recept.entity.RecipeRef;
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
	private List<RefDto> refs = new ArrayList<>();

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
		@NotNull
		private Integer order;

		public static DetailDto of(Detail detail) {
			return new DetailDto(detail.getId(), detail.getDescription(), detail.getFilePath(), detail.getOrder());
		}
	}

	@Builder
	@Getter
	@NoArgsConstructor
	@AllArgsConstructor
	public static class RefDto {
		private Long id;
		private String norma;
		private Long recipeId;
		private String recipeName;
		private boolean optional;

		public static RefDto of(RecipeRef ref) {
			return RefDto.builder()
					.id(ref.getId())
					.norma(ref.getNorma())
					.recipeId(Optional.ofNullable(ref.getReferenceRecipe()).map(Recipe::getId).orElse(null))
					.recipeName(Optional.ofNullable(ref.getReferenceRecipe()).map(Recipe::getName).orElse(null))
					.optional(ref.isOptional())
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
				.refs(recipe.getRefs().stream().map(RefDto::of).collect(Collectors.toList()));
	}

}
