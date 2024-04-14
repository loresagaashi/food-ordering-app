package com.mcdonalds.foodordering.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.mcdonalds.foodordering.exception.AlreadyExistsException;
import com.mcdonalds.foodordering.exception.NotFoundException;
import com.mcdonalds.foodordering.model.Category;
import com.mcdonalds.foodordering.repository.CategoryRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CategoryService implements ICategoryService {

    private final CategoryRepository categoryRepository;

    
    public List<Category> getCategories(){
        return categoryRepository.findAll();
    }

    public Category addCategory(Category category){
        if(categoryAlreadyExists(category.getName())){
            throw new AlreadyExistsException(category.getName()+"Category already exists");
        }
        return categoryRepository.save(category);
    }
    
    public Category getCategoryById(Long id){
        return categoryRepository.findById(id).orElseThrow(() -> new NotFoundException("No category found with this id: "+id));
    }

    private boolean categoryAlreadyExists(String name){
        return categoryRepository.findByName(name).isPresent();
    }

    public Category updateCategory(Category category, Long id){
        return categoryRepository.findById(id).map(c -> {
            c.setName(category.getName());
            return categoryRepository.save(c);
        }).orElseThrow(() -> new NotFoundException("This category could not be found"));
    }

    public void deleteCategory(Long id){
        if(!categoryRepository.existsById(id)){
            throw new NotFoundException("No category was found with this id: "+id);
        }
        categoryRepository.deleteById(id);
    }
}
