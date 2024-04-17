package com.mcdonalds.foodordering.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mcdonalds.foodordering.model.OrderLine;

public interface OrderLineRepository extends JpaRepository<OrderLine, Long>{
    
}
