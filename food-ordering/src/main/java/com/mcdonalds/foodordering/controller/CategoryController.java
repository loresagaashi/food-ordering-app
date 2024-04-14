package com.mcdonalds.foodordering.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.mcdonalds.foodordering.model.Category;
import com.mcdonalds.foodordering.service.CategoryService;

import lombok.RequiredArgsConstructor;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping
    public ResponseEntity<List<Category>> getCategories() {
        List<Category> categories = categoryService.getCategories();
        return ResponseEntity.status(HttpStatus.OK).body(categories);
    }

    @PostMapping
    public ResponseEntity<Category> addCategory(@RequestBody Category category) {
        Category addedCategory = categoryService.addCategory(category);
        return ResponseEntity.status(HttpStatus.CREATED).body(addedCategory);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Category> updateCategory(@RequestBody Category category, @PathVariable Long id) {
        Category updatedCategory = categoryService.updateCategory(category, id);
        return ResponseEntity.status(HttpStatus.OK).body(updatedCategory);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @GetMapping("/category/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable Long id) {
        Category category = categoryService.getCategoryById(id);
        return ResponseEntity.status(HttpStatus.OK).body(category);
    }
}
