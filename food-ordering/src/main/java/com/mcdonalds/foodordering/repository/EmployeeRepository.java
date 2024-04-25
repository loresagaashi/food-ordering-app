package com.mcdonalds.foodordering.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mcdonalds.foodordering.model.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    // Optional<Employee> findByEmail(String email);
    
}
