package com.mcdonalds.foodordering.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mcdonalds.foodordering.model.Employee;
import com.mcdonalds.foodordering.service.EmployeeService;


// @CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/employees")
public class EmployeeController extends BasicControllerOperations<EmployeeService,Employee>{

    public EmployeeController(EmployeeService service){
        super(service);
    }

    // @PostMapping("/update/{id}")
    // public Employee updateEmployee(@RequestBody Employee employee, @PathVariable Long id){
    //     return employeeService.updateEmployee(employee, id);
    // } 

}
