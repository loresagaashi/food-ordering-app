package com.mcdonalds.foodordering.service;

import java.util.List;

import com.mcdonalds.foodordering.model.Product;

public interface IProductService {

    Product addProduct(Product product);

    List<Product> getProducts();

    Product updateProduct(Product product, Long id);

    Product getProductById(Long id);

    void deleteProduct(Long id);
}
