package com.anna.recept.service.impl;

import com.anna.recept.entity.Department;
import com.anna.recept.exception.Errors;
import com.anna.recept.exception.RecipeApplicationException;
import com.anna.recept.repository.DepartmentRepository;
import com.anna.recept.service.IDepartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class DepartService implements IDepartService {

    @Autowired
    private DepartmentRepository departRep;

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
    public void deleteDepartment(Long id) {
        if (!departRep.existsById(id)) {
            throw new EntityNotFoundException(Errors.DEPART_NOT_FOUND.getCause());
        }
        departRep.deleteById(id);
    }
}
