package com.mcdonalds.foodordering.controller;

import com.mcdonalds.foodordering.model.StoreHours;
import com.mcdonalds.foodordering.service.StoreHoursService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/storeHours")
@RequiredArgsConstructor
public class StoreHoursController {

    private final StoreHoursService storeHoursService;

    @GetMapping
    public ResponseEntity<List<StoreHours>> getAllStoreHours() {
        return new ResponseEntity<>(storeHoursService.getAllStoreHours(), HttpStatus.FOUND);
    }

    @GetMapping("/storeHour/{id}")
    public StoreHours getStoreHoursById(@PathVariable Long id) {
        return storeHoursService.getStoreHoursById(id);
    }

    @PostMapping
    public StoreHours addStoreHours(@RequestBody StoreHours storeHours) {
        return storeHoursService.addStoreHours(storeHours);
    }

    @PutMapping("/update/{id}")
    public StoreHours updateStoreHours(@RequestBody StoreHours storeHours, @PathVariable Long id) {
        return storeHoursService.updateStoreHours(storeHours, id);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteStoreHours(@PathVariable Long id) {
        storeHoursService.deleteStoreHours(id);
    }
}
