package com.mcdonalds.foodordering.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mcdonalds.foodordering.model.Product;
import com.mcdonalds.foodordering.service.ProductService;


@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/products")
public class ProductController extends BasicControllerOperations<ProductService, Product>{

    public ProductController(ProductService service) {
        super(service);
    }

}