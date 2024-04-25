package com.mcdonalds.foodordering.service;

import org.springframework.stereotype.Service;

import com.mcdonalds.foodordering.model.StoreLocation;
import com.mcdonalds.foodordering.repository.StoreLocationRepository;

@Service
public class StoreLocationService extends BasicServiceOperations<StoreLocationRepository, StoreLocation>{

    public StoreLocationService(StoreLocationRepository repository){
        super(repository);
    }
}
