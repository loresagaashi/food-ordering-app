package com.mcdonalds.foodordering.service;

import org.springframework.stereotype.Service;

import com.mcdonalds.foodordering.model.OrderLine;
import com.mcdonalds.foodordering.repository.OrderLineRepository;

@Service
public class OrderLineService extends BasicServiceOperations<OrderLineRepository, OrderLine>{

    public OrderLineService(OrderLineRepository repository) {
        super(repository);
    }
}
