package com.mcdonalds.foodordering.controller;

import com.mcdonalds.foodordering.model.DeliveryHours;
import com.mcdonalds.foodordering.service.BasicServiceOperations;
import com.mcdonalds.foodordering.service.DeliveryHoursService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/delivery-hours")
public class DeliveryHoursController extends BasicControllerOperations<DeliveryHoursService, DeliveryHours>{

    public DeliveryHoursController(DeliveryHoursService deliveryHoursServiceservice) {
        super(deliveryHoursServiceservice);
        
    }

    

  
  

}
