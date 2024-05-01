package com.mcdonalds.foodordering.service;

import org.springframework.stereotype.Service;

import com.mcdonalds.foodordering.model.Offer;
import com.mcdonalds.foodordering.repository.OfferRepository;

@Service
public class OfferService extends BasicServiceOperations<OfferRepository, Offer>{

    public OfferService(OfferRepository repository) {
        super(repository);
    }
    
}
