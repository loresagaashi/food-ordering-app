package com.mcdonalds.foodordering.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mcdonalds.foodordering.model.StoreLocation;
import com.mcdonalds.foodordering.service.StoreLocationService;

@RestController
@RequestMapping("/storeLocations")
public class StoreLocationController extends BasicControllerOperations<StoreLocationService, StoreLocation>{

    public StoreLocationController(StoreLocationService service) {
        super(service);
    }
    
}
