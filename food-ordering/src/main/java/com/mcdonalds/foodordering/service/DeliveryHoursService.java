package com.mcdonalds.foodordering.service;

import com.mcdonalds.foodordering.model.DeliveryHours;
import com.mcdonalds.foodordering.repository.DeliveryHoursRepository;

import org.springframework.stereotype.Service;

@Service
public class DeliveryHoursService extends BasicServiceOperations<DeliveryHoursRepository, DeliveryHours>{

    public DeliveryHoursService(DeliveryHoursRepository repository) {
        super(repository);
    }

}