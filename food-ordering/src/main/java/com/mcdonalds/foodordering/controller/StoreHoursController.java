package com.mcdonalds.foodordering.controller;

import com.mcdonalds.foodordering.model.StoreHours;
import com.mcdonalds.foodordering.service.StoreHoursService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/storehours")
public class StoreHoursController {

    @Autowired
    private StoreHoursService storeHoursService;

    @GetMapping
    public List<StoreHours> getAllStoreHours() {
        return storeHoursService.getAllStoreHours();
    }

    @GetMapping("/{id}")
    public StoreHours getStoreHoursById(@PathVariable Long id) {
        return storeHoursService.getStoreHoursById(id);
    }

    @PostMapping
    public StoreHours createStoreHours(@RequestBody StoreHours storeHours) {
        return storeHoursService.createStoreHours(storeHours);
    }

    @PutMapping("/{id}")
    public StoreHours updateStoreHours(@PathVariable Long id, @RequestBody StoreHours storeHours) {
        return storeHoursService.updateStoreHours(id, storeHours);
    }

    @DeleteMapping("/{id}")
    public void deleteStoreHours(@PathVariable Long id) {
        storeHoursService.deleteStoreHours(id);
    }
}
