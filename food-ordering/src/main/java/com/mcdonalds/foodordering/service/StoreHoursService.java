package com.mcdonalds.foodordering.service;

import com.mcdonalds.foodordering.exception.NotFoundException;
import com.mcdonalds.foodordering.model.StoreHours;
import com.mcdonalds.foodordering.repository.StoreHoursRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class StoreHoursService {

    @Autowired
    private StoreHoursRepository storeHoursRepository;

    public List<StoreHours> getAllStoreHours() {
        return storeHoursRepository.findAll();
    }

    public StoreHours getStoreHoursById(Long id) {
        Optional<StoreHours> storeHoursOptional = storeHoursRepository.findById(id);
        return storeHoursOptional.orElse(null); 
    }

    public StoreHours addStoreHours(StoreHours storeHours) {
        // if(storeHoursAlreadyExists(storeHours.getId())){
        //     throw new AlreadyExistsException(storeHours.getId()+" Store Hour already Exists!");
        // }
        return storeHoursRepository.save(storeHours);
    }

    public StoreHours updateStoreHours(StoreHours storeHours,Long id) {
        // Optional<StoreHours> existingStoreHoursOptional = storeHoursRepository.findById(id);
        // if (existingStoreHoursOptional.isPresent()) {
        //     StoreHours existingStoreHours = existingStoreHoursOptional.get();
        //     existingStoreHours.setDayOfWeek(storeHours.getDayOfWeek());
        //     existingStoreHours.setStartTime(storeHours.getStartTime());
        //     existingStoreHours.setEndTime(storeHours.getEndTime());
        //     return storeHoursRepository.save(existingStoreHours);
        // } else {
        //     return null; 
        // }
        return storeHoursRepository.findById(id).map(st -> {
            st.setDayOfWeek(storeHours.getDayOfWeek());
            st.setStartTime(storeHours.getStartTime());
            st.setEndTime(storeHours.getEndTime());
            return storeHoursRepository.save(st);
        }).orElseThrow(() -> new NotFoundException("This Store Hour could not be found"));
    }

    public void deleteStoreHours(Long id) {
        if (!storeHoursRepository.existsById(id)) {
            throw new NotFoundException("No Store Hour found with this Id: "+id);
           }
        storeHoursRepository.deleteById(id);
    }
    // private boolean storeHoursAlreadyExists(Long id) {
    //     return storeHoursRepository.findStoreHoursByStoreId(id).isPresent();
    // }
    
}
