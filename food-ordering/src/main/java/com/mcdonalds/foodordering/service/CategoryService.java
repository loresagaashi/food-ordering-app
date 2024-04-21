package com.mcdonalds.foodordering.service;

import com.mcdonalds.foodordering.model.Category;
import com.mcdonalds.foodordering.repository.CategoryRepository;
import org.springframework.stereotype.Service;

@Service
public class CategoryService extends BasicServiceOperations<CategoryRepository, Category> {
    public CategoryService(CategoryRepository repository) {
        super(repository);
    }

    public Category save(Category entity) {
        if (entity.getId() == null) {
            super.save(entity);
        }

        validateEntity(entity);
        Category category = findById(entity.getId());
        category.setName(entity.getName());

        return repository.save(category);
    }
}
