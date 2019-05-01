package com.anna.recept.service.impl;

import com.anna.recept.dto.RecipeDto;
import com.anna.recept.entity.Department;
import com.anna.recept.entity.Recipe;
import com.anna.recept.exception.Errors;
import com.anna.recept.exception.RecipeApplicationException;
import com.anna.recept.repository.DepartmentRepository;
import com.anna.recept.repository.RecipeRepository;
import com.anna.recept.service.IDepartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

@Service
public class DepartService implements IDepartService {

    @Autowired
    private DepartmentRepository departRep;
    @Autowired
    private RecipeRepository recipeRep;

    @Override
    public List<Department> findAllDepartments() {
        return departRep.findAll();
    }

    @Override
    public Department createNewDepartment(Department department) {
        Assert.notNull(department, Errors.REQUEST_MUST_NOT_BE_NULL.getCause());
        Assert.isNull(department.getId(), Errors.ID_MUST_BE_NULL.getCause());
        Department departmentWithSameName = departRep.findByNameIgnoreCase(department.getName());
        if (departmentWithSameName != null) {
            throw new RecipeApplicationException(Errors.DEPART_NAME_NOT_UNIQUE);
        }
        return departRep.saveAndFlush(department);
    }

    @Override
    public void deleteDepartment(Integer id) {
        if (!departRep.existsById(id)) {
            throw new EntityNotFoundException(Errors.DEPART_NOT_FOUND.getCause());
        }
        departRep.deleteById(id);
    }

    @Transactional
    @Override
    public List<RecipeDto> findRecipesByDepart(Integer id) {
        Department department = departRep.findById(id).orElseThrow(() -> new EntityNotFoundException(Errors.DEPART_NOT_FOUND.getCause()));

        return recipeRep.findByDepartment(department).stream()
                .map(RecipeDto::withBasicFields)
                .collect(Collectors.toList());
    }
}
