package com.mcdonalds.foodordering.controller;


import com.mcdonalds.foodordering.payload.CustomerPayload;
import com.mcdonalds.foodordering.payload.LoginPayload;

import java.time.LocalDate;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mcdonalds.foodordering.model.Customer;
import com.mcdonalds.foodordering.service.CustomerService;


@RestController
@RequestMapping("/customers")
public class CustomerController extends BasicControllerOperations<CustomerService, Customer>{
    public CustomerController(CustomerService service) {
        super(service);
    }
    @PostMapping("/login")
    public Customer login(@RequestBody @Validated LoginPayload login) {
        return this.service.login(login.getEmail(), login.getPassword());
    }
//   @PostMapping("/customers")
//     public void saveOrUpdateCustomer(@RequestBody CustomerPayload requestPayload) {
//         LocalDate birthDate = requestPayload.getBirthDate();

//         System.out.println("Received birth date: " + birthDate);
//     }
    
}
