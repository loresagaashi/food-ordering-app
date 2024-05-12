package com.mcdonalds.foodordering.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// import org.springframework.web.bind.annotation.*;

import com.mcdonalds.foodordering.model.Address;
import com.mcdonalds.foodordering.service.AddressService;

@RestController
@RequestMapping("/addresses")
public class AddressController extends BasicControllerOperations<AddressService,Address>{

    public AddressController(AddressService service) {
        super(service);
    }
     
}
