package com.anna.recept.service;

import com.anna.recept.entity.Department;

import java.util.List;

public interface IDepartService {
    List<Department> findAllDepartments();
    Department createNewDepartment(Department department);
    void deleteDepartment(Long id);
}
