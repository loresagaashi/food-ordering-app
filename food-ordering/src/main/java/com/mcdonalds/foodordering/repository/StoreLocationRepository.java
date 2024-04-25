package com.mcdonalds.foodordering.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mcdonalds.foodordering.model.StoreLocation;

public interface StoreLocationRepository extends JpaRepository<StoreLocation,Long>{
    
    Optional<StoreLocation> findBynameOfLocation(String nameOfLocation);
}
