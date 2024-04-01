package com.mcdonalds.foodordering.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mcdonalds.foodordering.model.Product;

import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product,Long>{
    
    Optional<Product> findByName(String name);

}
