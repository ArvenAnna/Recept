package com.anna.recept.service.impl;

import com.anna.recept.entity.Department;
import com.anna.recept.repository.DepartmentRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import java.util.Arrays;
import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.core.Is.is;
import static org.junit.Assert.assertNotNull;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class DepartServiceTest {

    @Mock
    DepartmentRepository repository;

    @InjectMocks
    DepartService sut;

    @Test
    public void shouldFindDepartments() {
        Department expected = new Department();
        when(repository.findAll()).thenReturn(Arrays.asList(expected));

        List<Department> actual = sut.findAllDepartments();

        assertNotNull(actual);
        assertThat(actual.size(), is(1));
    }
}
