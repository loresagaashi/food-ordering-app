// package com.mcdonalds.foodordering.model;

// import com.mcdonalds.foodordering.model.StoreHours;
// import jakarta.persistence.EnumType;
// import jakarta.persistence.Enumerated;
// import java.time.DayOfWeek;
// import java.time.LocalTime;

// public class DeliveryHoursDto {

//     private Long id;
    
//     private DayOfWeek dayOfWeek;
    
//     private LocalTime startTime;
    
//     private LocalTime endTime;

//     private Long storeHoursId;

//     public DeliveryHoursDto() {
        
//     }

//     public DeliveryHoursDto(Long id, DayOfWeek dayOfWeek, LocalTime startTime, LocalTime endTime, Long storeHoursId) {
//         this.id = id;
//         this.dayOfWeek = dayOfWeek;
//         this.startTime = startTime;
//         this.endTime = endTime;
//         this.storeHoursId = storeHoursId;
//     }

//     public Long getId() {
//         return id;
//     }

//     public void setId(Long id) {
//         this.id = id;
//     }

//     public DayOfWeek getDayOfWeek() {
//         return dayOfWeek;
//     }

//     public void setDayOfWeek(DayOfWeek dayOfWeek) {
//         this.dayOfWeek = dayOfWeek;
//     }

//     public LocalTime getStartTime() {
//         return startTime;
//     }

//     public void setStartTime(LocalTime startTime) {
//         this.startTime = startTime;
//     }

//     public LocalTime getEndTime() {
//         return endTime;
//     }

//     public void setEndTime(LocalTime endTime) {
//         this.endTime = endTime;
//     }

//     public Long getStoreHoursId() {
//         return storeHoursId;
//     }

//     public void setStoreHoursId(Long storeHoursId) {
//         this.storeHoursId = storeHoursId;
//     }


//     public static DeliveryHoursDto fromEntity(com.mcdonalds.foodordering.model.DeliveryHours deliveryHours) {
//         return new DeliveryHoursDto(
//                 deliveryHours.getId(),
//                 deliveryHours.getDayOfWeek(),
//                 deliveryHours.getStartTime(),
//                 deliveryHours.getEndTime(),
//                 deliveryHours.getStoreHours().getId()
//         );
//     }
// }

