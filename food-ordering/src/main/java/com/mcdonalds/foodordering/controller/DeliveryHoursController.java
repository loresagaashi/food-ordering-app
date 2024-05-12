package com.mcdonalds.foodordering.controller;

import com.mcdonalds.foodordering.model.DeliveryHours;
import com.mcdonalds.foodordering.service.DeliveryHoursService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/deliveryHours")
public class DeliveryHoursController extends BasicControllerOperations<DeliveryHoursService, DeliveryHours>{

    public DeliveryHoursController(DeliveryHoursService service) {
        super(service);
        
    }

}
