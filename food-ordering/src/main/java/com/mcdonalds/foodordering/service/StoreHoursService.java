package com.mcdonalds.foodordering.service;

import com.mcdonalds.foodordering.model.StoreHours;
import com.mcdonalds.foodordering.repository.StoreHoursRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StoreHoursService {

    @Autowired
    private StoreHoursRepository storeHoursRepository;

    public List<StoreHours> getAllStoreHours() {
        return storeHoursRepository.findAll();
    }

    public StoreHours getStoreHoursById(Long id) {
        Optional<StoreHours> storeHoursOptional = storeHoursRepository.findById(id);
        return storeHoursOptional.orElse(null); // Return null if not found
    }

    public StoreHours createStoreHours(StoreHours storeHours) {
        return storeHoursRepository.save(storeHours);
    }

    public StoreHours updateStoreHours(Long id, StoreHours storeHours) {
        // Check if the store hours exist
        Optional<StoreHours> existingStoreHoursOptional = storeHoursRepository.findById(id);
        if (existingStoreHoursOptional.isPresent()) {
            StoreHours existingStoreHours = existingStoreHoursOptional.get();
            // Update the existing store hours with the new values
            existingStoreHours.setDayOfWeek(storeHours.getDayOfWeek());
            existingStoreHours.setStartTime(storeHours.getStartTime());
            existingStoreHours.setEndTime(storeHours.getEndTime());
            return storeHoursRepository.save(existingStoreHours);
        } else {
            return null; // Return null if the store hours with given id does not exist
        }
    }

    public void deleteStoreHours(Long id) {
        storeHoursRepository.deleteById(id);
    }
}
