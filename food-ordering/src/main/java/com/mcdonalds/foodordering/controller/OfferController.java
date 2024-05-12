package com.mcdonalds.foodordering.controller;

// import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mcdonalds.foodordering.model.Offer;
import com.mcdonalds.foodordering.service.OfferService;

@RestController
@RequestMapping("/offers")
public class OfferController extends BasicControllerOperations<OfferService, Offer>{

    public OfferController(OfferService service) {
        super(service);
    }
    
}
