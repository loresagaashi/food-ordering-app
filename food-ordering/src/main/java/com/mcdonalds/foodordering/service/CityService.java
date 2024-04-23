package com.mcdonalds.foodordering.service;

import org.springframework.stereotype.Service;
import com.mcdonalds.foodordering.model.City;
import com.mcdonalds.foodordering.repository.CityRepository;


@Service
public class CityService extends BasicServiceOperations<CityRepository, City> {
   public CityService(CityRepository repository) {
      super(repository);
   }

   public City save(City entity) {
      if (entity.getId() == null) {
         super.save(entity);
      }

      validateEntity(entity);
      City city = findById(entity.getId());
      city.setName(entity.getName());

      return repository.save(city);
   }
   // private boolean cityAlreadyExists(String name) {
   // return cityRepository.findByName(name).isPresent();
   // }

}
