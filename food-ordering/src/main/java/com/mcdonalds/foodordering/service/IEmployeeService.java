package com.mcdonalds.foodordering.service;

import com.mcdonalds.foodordering.model.Employee;
import java.util.List;

public interface IEmployeeService {

    Employee addEmployee(Employee employee);

    List<Employee> getEmployees();

    Employee updateEmployee(Employee employee, Long id);

    Employee getEmployeeById(Long id);

    void deleteEmployee(Long id);
}
