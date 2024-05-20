package com.mcdonalds.foodordering.model;

import java.util.List;

public class StoreLocationDto {

    private Long id;

    private String nameOfLocation;

    private List<HoursLocation> hoursLocations;

    public StoreLocationDto() {
        
    }

    public StoreLocationDto(Long id, String nameOfLocation, List<HoursLocation> hoursLocations) {
        this.id = id;
        this.nameOfLocation = nameOfLocation;
        this.hoursLocations = hoursLocations;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNameOfLocation() {
        return nameOfLocation;
    }

    public void setNameOfLocation(String nameOfLocation) {
        this.nameOfLocation = nameOfLocation;
    }

    public List<HoursLocation> getHoursLocations() {
        return hoursLocations;
    }

    public void setHoursLocations(List<HoursLocation> hoursLocations) {
        this.hoursLocations = hoursLocations;
    }
}
