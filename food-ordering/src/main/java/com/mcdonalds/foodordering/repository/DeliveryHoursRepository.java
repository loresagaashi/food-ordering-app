package com.mcdonalds.foodordering.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mcdonalds.foodordering.model.DeliveryHours;
import java.time.DayOfWeek;

import java.util.List;
import java.util.Optional;



public interface DeliveryHoursRepository extends JpaRepository<DeliveryHours, Long> {
    List<DeliveryHours> findByStoreId(Long storeId);
    
    List<DeliveryHours> findByDayOfWeekAndStoreId(DayOfWeek dayOfWeek, Long storeId);

    default DeliveryHours getDeliveryHoursById(Long id) {
        return findById(id)
                .orElseThrow(() -> new RuntimeException("Delivery hours not found with id: " + id));
    }
    
  
}
