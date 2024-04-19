package com.mcdonalds.foodordering.model;

import java.time.DayOfWeek;
import java.time.LocalTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.ManyToOne;

@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public class DeliveryHours extends StoreHours {

    private DayOfWeek dayOfWeek;
    private LocalTime startTime;
    private LocalTime endTime;

   

    public void setStoreHours(StoreHours storeHours) {
        super.setId(storeHours.getId()); 
      
    }

 
}

