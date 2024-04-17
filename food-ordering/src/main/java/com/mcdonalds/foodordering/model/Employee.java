package com.mcdonalds.foodordering.model;

import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.time.LocalDate;


@Data
@EqualsAndHashCode(callSuper = true)
@Entity
public class Employee extends UserAccount {

    private String firstName;

    private String lastName;

    private String email;

    private String password;

    private LocalDate birthDate;

    private String phoneNumber;

    private String Jobposition;

}