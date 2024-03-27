package com.mcdonalds.foodordering.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mcdonalds.foodordering.model.Admin;

public interface AdminRepository extends JpaRepository<Admin,Long>{

    Optional<Admin> findByEmail(String email);
    
}
