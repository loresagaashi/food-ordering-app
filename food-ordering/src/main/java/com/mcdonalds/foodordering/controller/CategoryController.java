package com.mcdonalds.foodordering.controller;

import com.mcdonalds.foodordering.model.Category;
import com.mcdonalds.foodordering.service.CategoryService;
// import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/categories")
public class CategoryController extends BasicControllerOperations<CategoryService, Category> {
    public CategoryController(CategoryService service) {
        super(service);
    }
}
