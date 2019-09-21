package com.anna.recept.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class SearchRecipeParams {
    private String search;
    private List<Long> ingredients;
    private List<Long> refs;
    private Long departmentId;
}
