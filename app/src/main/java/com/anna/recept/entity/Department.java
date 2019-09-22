package com.anna.recept.entity;

import lombok.*;

import javax.persistence.*;

import com.anna.recept.dto.RecipeDto;

@Getter
@Setter
@EqualsAndHashCode(of = {"id"})
@Entity
@Table(name = "department")
public class Department {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    public static Department of(RecipeDto.DepartmentDto dto) {
        Department department = new Department();
        department.setId(dto.getId());
        department.setName(dto.getName());
        return department;
    }

}
