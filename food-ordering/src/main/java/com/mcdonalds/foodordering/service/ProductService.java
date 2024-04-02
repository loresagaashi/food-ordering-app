package com.mcdonalds.foodordering.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mcdonalds.foodordering.exception.AlreadyExistsException;
import com.mcdonalds.foodordering.exception.NotFoundException;
import com.mcdonalds.foodordering.model.Product;
import com.mcdonalds.foodordering.repository.ProductRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductService implements IProductService {
    
    @Autowired
    private final ProductRepository productRepository;

    @Override
    public List<Product> getProducts(){
        return productRepository.findAll();
    }

    @Override
    public Product addProduct(Product product){
        if(productAlreadyExists(product.getName())){
            throw new AlreadyExistsException(product.getName()+" - Product already exists!");
        }
        return productRepository.save(product);
    }
    
    @Override
    public Product getProductById(Long id){
        return productRepository.findById(id).orElseThrow(() -> new NotFoundException("No product found with this id: "+id+"!"));
    }

    private boolean productAlreadyExists(String name){
        return productRepository.findByName(name).isPresent();
    }

    @Override
    public Product updateProduct(Product product, Long id){
        return productRepository.findById(id).map(p -> {
            p.setName(product.getName());
            p.setDescription(product.getDescription());
            p.setPrice(product.getPrice());
            p.setCategory(product.getCategory());
            p.setBonusPoints(product.getBonusPoints());
            return productRepository.save(p);
        }).orElseThrow(() -> new NotFoundException("This product could not be found!"));
    }

    @Override
    public void deleteProduct(Long id){
        if(!productRepository.existsById(id)){
            throw new NotFoundException("No product was found with this id: "+id+"!");
        }
        productRepository.deleteById(id);
    }
}
