package com.mcdonalds.foodordering.model;

import java.time.DayOfWeek;
import java.time.LocalTime;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
public class DeliveryHours extends BaseEntity {

    private DayOfWeek dayOfWeek;
    private LocalTime startTime;
    private LocalTime endTime;

   
    @OneToOne
    @JoinColumn(name = "store_hours_id")
    private StoreHours storeHours;

    // public void setStoreHours(StoreHours storeHours) {
    //     super.setId(storeHours.getId()); 
      
    // }

}