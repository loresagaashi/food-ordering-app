package com.mcdonalds.foodordering.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.mcdonalds.foodordering.model.Employee;
import com.mcdonalds.foodordering.repository.EmployeeRepository;


@Service
public class EmployeeService extends BasicServiceOperations<EmployeeRepository, Employee>{

    public EmployeeService(EmployeeRepository repository){
        super(repository);
    }

    // public Employee updateEmployee(Employee employee,Long id){
    //     return employeeRepository.findById(id).map(em-> {
    //             em.setFirstName(employee.getFirstName());
    //             em.setLastName(employee.getLastName());
    //             em.setEmail(employee.getEmail());
    //             em.setBirthDate(employee.getBirthDate());
    //             em.setPhoneNumber(employee.getPhoneNumber());
    //             em.setPassword(employee.getPassword());
    //             em.setJobposition(employee.getJobposition());
    //             return employeeRepository.save(em);
    //     }).orElseThrow(() -> new NotFoundException("This Employee could not be found"));
    // }

    @Autowired
    private EmployeeRepository employeeRepository;    
    
    private boolean employeeAlreadyExists(String email) {
        return employeeRepository.findByEmail(email).isPresent();
    }
}
