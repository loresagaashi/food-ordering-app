package com.mcdonalds.foodordering.service;

import com.mcdonalds.foodordering.exception.EntityValidationException;
import com.mcdonalds.foodordering.exception.ExceptionPayload;
import com.mcdonalds.foodordering.model.Admin;
import com.mcdonalds.foodordering.repository.AdminRepository;
import org.springframework.stereotype.Service;

@Service
public class AdminService extends BasicServiceOperations<AdminRepository, Admin> {
    public AdminService(AdminRepository repository) {
        super(repository);
    }

    public Admin login(String email, String password) {
        Admin admin = this.repository.findByEmail(email)
                .orElseThrow(() -> new EntityValidationException(ExceptionPayload.builder()
                        .code("WrongEmail")
                        .fieldName("email")
                        .rejectedValue(email)
                        .message("Wrong email")
                        .build())
                );
        if (!admin.getPassword().equals(password)) {
            throw new EntityValidationException(ExceptionPayload.builder()
                    .code("WrongPassword")
                    .fieldName("password")
                    .rejectedValue(password)
                    .message("Wrong password")
                    .build());
        }

        return admin;
    }
}
