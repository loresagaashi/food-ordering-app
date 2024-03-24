package com.mcdonalds.foodordering.model;

import jakarta.persistence.Entity;
import jakarta.persistence.MappedSuperclass;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDate;

@Data
@EqualsAndHashCode(callSuper = true)
@MappedSuperclass
public abstract class UserAccount extends BaseEntity {

    private String firstName;

    private String lastName;

    private String email;

    private String password;

    private LocalDate birthDate;

    private String phoneNumber;

}
