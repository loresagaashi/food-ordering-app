package com.mcdonalds.foodordering.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mcdonalds.foodordering.model.City;
import com.mcdonalds.foodordering.service.CityService;

import lombok.RequiredArgsConstructor;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/cities")
@RequiredArgsConstructor
public class CityController {

   private final CityService cityService;

   @GetMapping
   public ResponseEntity<List<City>> getCities() {
      return new ResponseEntity<>(cityService.getCities(), HttpStatus.FOUND);
   }

   @PostMapping
   public City addCity(@RequestBody City city) {
      return cityService.addCity(city);
   }

   @PutMapping("/update/{id}")
   public City updateCity(@RequestBody City city, @PathVariable Long id) {
      return cityService.updateCity(city, id);
   }

   @DeleteMapping("/delete/{id}")
   public void deleteCity(@PathVariable Long id) {
      cityService.deleteCity(id);
   }

   @GetMapping("/city/{id}")
   public City getCityById(@PathVariable Long id) {
      return cityService.getCityById(id);
   }
   
}
