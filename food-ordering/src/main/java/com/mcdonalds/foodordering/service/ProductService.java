package com.mcdonalds.foodordering.service;


import org.springframework.stereotype.Service;

import com.mcdonalds.foodordering.model.Product;
import com.mcdonalds.foodordering.repository.ProductRepository;


@Service
public class ProductService extends BasicServiceOperations<ProductRepository, Product>{

    public ProductService(ProductRepository repository) {
        super(repository);
    }

    // private boolean productAlreadyExists(String name){
    //     return productRepository.findByName(name).isPresent();
    // }

}
