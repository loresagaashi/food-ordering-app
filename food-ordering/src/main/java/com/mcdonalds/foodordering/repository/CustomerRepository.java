package com.mcdonalds.foodordering.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.mcdonalds.foodordering.model.Customer;
import com.mcdonalds.foodordering.model.Product;

public interface CustomerRepository extends JpaRepository<Customer, Long>{
     Optional<Customer> findByEmail(String email);


     @Query("SELECT c.favorites FROM Customer c WHERE c.id = ?1")
     List<Product> findFavoriteProductsByCustomerId(Long id);
}
