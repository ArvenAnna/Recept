package com.anna.recept.service.impl;

import com.anna.recept.entity.Department;
import com.anna.recept.repository.DepartmentRepository;
import com.anna.recept.service.IDepartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DepartService implements IDepartService {

    @Autowired
    private DepartmentRepository departRep;

    @Override
    @Transactional
    public List<Department> findAllDepartments() {
        return departRep.findAll().stream().map(depart -> constructDto(depart)).collect(Collectors.toList());
    }

    private Department constructDto(Department depart) {
        Department departmentDto = new Department();
        departmentDto.setId(depart.getId());
        departmentDto.setName(depart.getName());
        return departmentDto;
    }
}
