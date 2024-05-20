package com.mcdonalds.foodordering.model;

import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.List;

public class StoreHoursDto {

    private Long id;

    private DayOfWeek dayOfWeek;

    private LocalTime startTime;

    private LocalTime endTime;

    private List<DeliveryHoursDto> deliveryHours;

    public StoreHoursDto() {
      
    }

    public StoreHoursDto(Long id, DayOfWeek dayOfWeek, LocalTime startTime, LocalTime endTime, List<DeliveryHoursDto> deliveryHours) {
        this.id = id;
        this.dayOfWeek = dayOfWeek;
        this.startTime = startTime;
        this.endTime = endTime;
        this.deliveryHours = deliveryHours;
    }

   
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public DayOfWeek getDayOfWeek() {
        return dayOfWeek;
    }

    public void setDayOfWeek(DayOfWeek dayOfWeek) {
        this.dayOfWeek = dayOfWeek;
    }

    public LocalTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalTime startTime) {
        this.startTime = startTime;
    }

    public LocalTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalTime endTime) {
        this.endTime = endTime;
    }

    public List<DeliveryHoursDto> getDeliveryHours() {
        return deliveryHours;
    }

    public void setDeliveryHours(List<DeliveryHoursDto> deliveryHours) {
        this.deliveryHours = deliveryHours;
    }
}
