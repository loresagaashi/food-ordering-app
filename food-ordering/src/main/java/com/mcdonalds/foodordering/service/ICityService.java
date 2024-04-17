package com.mcdonalds.foodordering.service;

import java.util.List;

import com.mcdonalds.foodordering.model.City;

public interface ICityService {

   City addCity(City city);

   List<City> getCities();

   City updateCity(City city, Long id);

   City getCityById(Long id);

   void deleteCity(Long id);
}
