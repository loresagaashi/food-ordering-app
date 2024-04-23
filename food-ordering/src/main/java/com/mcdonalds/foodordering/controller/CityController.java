package com.mcdonalds.foodordering.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mcdonalds.foodordering.model.City;
import com.mcdonalds.foodordering.service.CityService;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/city")
public class CityController extends BasicControllerOperations<CityService, City> {
   public CityController(CityService service) {
      super(service);
   }

}
