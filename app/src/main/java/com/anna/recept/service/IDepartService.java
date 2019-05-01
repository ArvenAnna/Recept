package com.anna.recept.service;

import com.anna.recept.dto.RecipeDto;
import com.anna.recept.entity.Department;
import com.anna.recept.entity.Recipe;

import java.util.List;

public interface IDepartService {
    List<Department> findAllDepartments();
    Department createNewDepartment(Department department);
    void deleteDepartment(Integer id);
    List<RecipeDto> findRecipesByDepart(Integer id);
}
