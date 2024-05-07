package com.mcdonalds.foodordering.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mcdonalds.foodordering.model.Employee;
import com.mcdonalds.foodordering.service.EmployeeService;

@RestController
@RequestMapping("/employees")
public class EmployeeController extends BasicControllerOperations<EmployeeService,Employee>{

    public EmployeeController(EmployeeService service){
        super(service);
    }

}
