package com.mcdonalds.foodordering.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.mcdonalds.foodordering.exception.AlreadyExistsException;
import com.mcdonalds.foodordering.exception.NotFoundException;

import com.mcdonalds.foodordering.model.City;
import com.mcdonalds.foodordering.repository.CityRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CityService implements ICityService {

   private final CityRepository cityRepository;

   @Override
   public List<City> getCities() {
      return cityRepository.findAll();
   }

   @Override
   public City addCity(City city) {
      if (cityAlreadyExists(city.getName())) {
         throw new AlreadyExistsException(city.getName() + " - City already exists!");
      }
      return cityRepository.save(city);
   }

   @Override
   public City getCityById(Long id) {
      return cityRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("No city found with this id: " + id + "!"));
   }

   private boolean cityAlreadyExists(String name) {
      return cityRepository.findByName(name).isPresent();
   }

   @Override
   public City updateCity(City city, Long id) {
      return cityRepository.findById(id).map(c -> {
         c.setName(city.getName());
         return cityRepository.save(c);
      }).orElseThrow(() -> new NotFoundException("This city could not be found!"));
   }

   @Override
   public void deleteCity(Long id) {
      if (!cityRepository.existsById(id)) {
         throw new NotFoundException("No city was found with this id: " + id + "!");
      }
      cityRepository.deleteById(id);
   }

}
