package com.anna.recept.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.anna.recept.entity.Department;
import com.anna.recept.entity.Recipe;
import com.anna.recept.service.IDepartService;

@RestController
public class DepartmentController {

	@Autowired
	private IDepartService departServ;

	@RequestMapping(value = {"/departs"}, method = RequestMethod.GET,
			headers = "Accept=application/json")
	public List<Department> departsList() {
		return departServ.findAllDepartments();
	}

	@RequestMapping(value = {"/departs"}, method = RequestMethod.POST,
			headers = "Accept=application/json")
	public Department createDepart(@RequestBody Department department) {
		return departServ.createNewDepartment(department);
	}

	@RequestMapping(value = {"/departs/{id}"}, method = RequestMethod.DELETE,
			headers = "Accept=application/json")
	public void removeDepart(@PathVariable("id") Integer id) {
		departServ.deleteDepartment(id);
	}

	@RequestMapping(value = {"/departs/{id}/recipes"}, method = RequestMethod.GET,
			headers = "Accept=application/json")
	public List<Recipe> getRecipesByDepart(@PathVariable("id") Integer id) {
		return departServ.findRecipesByDepart(id);
	}

}
