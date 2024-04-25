package com.mcdonalds.foodordering.service;

import org.springframework.stereotype.Service;
import com.mcdonalds.foodordering.model.Employee;
import com.mcdonalds.foodordering.repository.EmployeeRepository;


@Service
public class EmployeeService extends BasicServiceOperations<EmployeeRepository, Employee>{

    public EmployeeService(EmployeeRepository repository){
        super(repository);
    }
}
