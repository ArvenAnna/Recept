package com.anna.recept.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class SearchRecipeParams {
    private String search;
    private List<Long> ingredients;
    private List<Long> refs;
}
