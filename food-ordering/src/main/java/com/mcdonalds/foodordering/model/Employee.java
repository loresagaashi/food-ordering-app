package com.mcdonalds.foodordering.model;

import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;


@Data
@EqualsAndHashCode(callSuper = true)
@Entity
public class Employee extends UserAccount {

    private String fristName;

    private String lastName;

    private String jobPosition;

}