package com.mcdonalds.foodordering.controller;


import com.mcdonalds.foodordering.payload.LoginPayload;
import com.mcdonalds.foodordering.model.Admin;
import com.mcdonalds.foodordering.service.AdminService;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admins")
public class AdminController extends BasicControllerOperations<AdminService, Admin> {
    public AdminController(AdminService service) {
        super(service);
    }

    @PostMapping("/login")
    public Admin login(@RequestBody @Validated LoginPayload login) {
        return this.service.login(login.getEmail(), login.getPassword());
    }
}
