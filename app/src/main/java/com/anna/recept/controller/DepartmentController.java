package com.anna.recept.controller;

import com.anna.recept.entity.Department;
import com.anna.recept.service.IDepartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = {"/departs"}, headers = "Accept=application/json")
public class DepartmentController {

	@Autowired
	private IDepartService departServ;

	@RequestMapping(method = RequestMethod.GET)
	public List<Department> departsList() {
		return departServ.findAllDepartments();
	}

	@RequestMapping(method = RequestMethod.POST)
	public Department createDepart(@RequestBody Department department) {
		return departServ.createNewDepartment(department);
	}

	@RequestMapping(value = {"/{id}"}, method = RequestMethod.DELETE)
	public void removeDepart(@PathVariable("id") Long id) {
		departServ.deleteDepartment(id);
	}
}
