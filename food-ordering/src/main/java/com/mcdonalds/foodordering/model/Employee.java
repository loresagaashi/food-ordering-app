package com.mcdonalds.foodordering.model;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.EqualsAndHashCode;



@EqualsAndHashCode(callSuper = true)
@Data
@Entity
public class Employee extends BaseEntity {

    private String firstName;

    private String lastName;

    private String jobPosition;

    @ManyToOne
    @JoinColumn
    private StoreLocation storeLocation;
}