package com.mcdonalds.foodordering.repository;

import com.mcdonalds.foodordering.model.HoursLocation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HoursLocationRepository extends JpaRepository<HoursLocation, Long> {
    List<HoursLocation> findByStore_Id(Long storeId);
}

