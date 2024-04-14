package com.mcdonalds.foodordering.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.List;

import com.mcdonalds.foodordering.model.Address;
import com.mcdonalds.foodordering.service.IAddressService;

import lombok.RequiredArgsConstructor;

@CrossOrigin("http;//localhost:3000")
@RestController
@RequestMapping("/addresses")
@RequiredArgsConstructor
public class AddressController {
     
    private final IAddressService addressService;
    
    @GetMapping
    public ResponseEntity<List<Address>> getAddresses(){
        return new ResponseEntity<>(addressService.getAddresses(), HttpStatus.OK);
    }

    @PostMapping
    public Address addAddress(@RequestBody Address address){
        return addressService.addAddress(address);
    } 

    @PutMapping("/update/{id}")
    public Address updateAddress(@RequestBody Address address,@PathVariable Long id){
        return addressService.updateAddress(address,id);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteAddress(@PathVariable Long id){
        addressService.deleteAddress(id); 
    }

    @GetMapping("/address/{id}")
    public Address getAddressById(@PathVariable Long id){
        return addressService.getAddressById(id);
    }
}
