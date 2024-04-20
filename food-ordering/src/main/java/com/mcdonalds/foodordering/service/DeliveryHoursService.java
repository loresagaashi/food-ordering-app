package com.mcdonalds.foodordering.service;

import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mcdonalds.foodordering.model.DeliveryHours;
import com.mcdonalds.foodordering.model.StoreHours;
import com.mcdonalds.foodordering.repository.DeliveryHoursRepository;

@Service
public class DeliveryHoursService extends BasicServiceOperations<DeliveryHoursRepository,DeliveryHours> {

    public DeliveryHoursService(DeliveryHoursRepository repository) {
        super(repository);
       
    }
//public final DeliveryHoursRepository  deliveryHoursRepository;

// @Autowired
// public DeliveryHoursService(DeliveryHoursRepository  deliveryHoursRepository){
//     this.deliveryHoursRepository=deliveryHoursRepository;
// }

/**
 * @param storeHours
 */
public void createDeliveryHours(StoreHours storeHours){
    for (DayOfWeek dayOfWeek: DayOfWeek.values()){
        DeliveryHours deliveryHours = new DeliveryHours();
        deliveryHours.setStoreHours (storeHours);
        deliveryHours.setDayOfWeek(dayOfWeek);
        deliveryHours.setStartTime(LocalTime.of(10, 0));
        deliveryHours.setEndTime(LocalTime.of(3, 0));
           
        
   
  }
}
}
// }
// public List<DeliveryHours> getAllDeliveryHours() {
//     return deliveryHoursRepository.findAll();
// }
// public DeliveryHours getDeliveryHoursById(Long id) {
//     return deliveryHoursRepository.findById(id)
//             .orElseThrow(() -> new RuntimeException("Delivery hours not found with id: " + id));
// }


// public void createDeliveryHours(DeliveryHours deliveryHours) {
//     deliveryHoursRepository.save(deliveryHours);
// }
// public void updateDeliveryHours(DeliveryHours updatedDeliveryHours) {
//     DeliveryHours existingDeliveryHours = deliveryHoursRepository.getDeliveryHoursById(updatedDeliveryHours.getId());
//     existingDeliveryHours.setDayOfWeek(updatedDeliveryHours.getDayOfWeek());
//     existingDeliveryHours.setStartTime(updatedDeliveryHours.getStartTime());
//     existingDeliveryHours.setEndTime(updatedDeliveryHours.getEndTime());
//     deliveryHoursRepository.save(existingDeliveryHours);
// }
// public void deleteDeliveryHours(Long id) {
//     deliveryHoursRepository.deleteById(id);
// }


