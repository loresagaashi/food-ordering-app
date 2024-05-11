package com.mcdonalds.foodordering.controller;

import com.mcdonalds.foodordering.model.StoreHours;
import com.mcdonalds.foodordering.service.StoreHoursService;



import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/storeHours")

public class StoreHoursController extends BasicControllerOperations<StoreHoursService, StoreHours> {

   
   public StoreHoursController(StoreHoursService service){
    super(service);
   }
   
    
}
