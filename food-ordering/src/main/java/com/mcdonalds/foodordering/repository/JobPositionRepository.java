package com.mcdonalds.foodordering.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mcdonalds.foodordering.model.JobPosition;

public interface JobPositionRepository extends JpaRepository<JobPosition, Long>{
    
    Optional<JobPosition> findByName(String name);
}
