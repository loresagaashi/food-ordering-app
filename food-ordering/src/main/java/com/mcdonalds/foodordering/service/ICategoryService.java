package com.mcdonalds.foodordering.service;

import java.util.List;

import com.mcdonalds.foodordering.model.Category;

public interface ICategoryService {

    Category addCategory(Category category);

    List<Category> getCategories();

    Category updateCategory(Category category, Long id);

    Category getCategoryById(Long id);

    void deleteCategory(Long id);
}
