package com.mcdonalds.foodordering.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mcdonalds.foodordering.model.OrderLine;
import com.mcdonalds.foodordering.service.OrderLineService;

@RestController
@RequestMapping("/orderLine")
public class OrderLineController extends BasicControllerOperations<OrderLineService, OrderLine>{

    public OrderLineController(OrderLineService service) {
        super(service);
    }
    
}
