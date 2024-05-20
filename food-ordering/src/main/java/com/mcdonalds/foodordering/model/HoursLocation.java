package com.mcdonalds.foodordering.model;

import com.mcdonalds.foodordering.model.StoreHours;
import com.mcdonalds.foodordering.model.StoreLocation;

import jakarta.persistence.*;
import lombok.Data;



@Data
@Entity
@Table(name="hours_location")
public class HoursLocation extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "store_hours_id")
    private StoreHours storeHours;

    @ManyToOne
    @JoinColumn(name = "store_location_id")
    private StoreLocation storeLocation;
   
    public StoreHours getStoreHours() {
        return storeHours;
    }

    public void setStoreHours(StoreHours storeHours) {
        this.storeHours = storeHours;
    }

    public StoreLocation getStoreLocation() {
        return storeLocation;
    }

    public void setStoreLocation(StoreLocation storeLocation) {
        this.storeLocation = storeLocation;
    }
}

