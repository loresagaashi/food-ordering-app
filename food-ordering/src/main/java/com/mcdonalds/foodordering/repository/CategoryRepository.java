package com.mcdonalds.foodordering.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mcdonalds.foodordering.model.Category;

public interface CategoryRepository extends JpaRepository<Category,Long>{

    Optional<Category> findByName(String name);
    
}
