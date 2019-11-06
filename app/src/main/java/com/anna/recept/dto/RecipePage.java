package com.anna.recept.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class RecipePage {
	private List<RecipeDto> recipes;
	private long totalElements;
	private long totalPages;
	private long currentPage;
	private long pageSize;
}
