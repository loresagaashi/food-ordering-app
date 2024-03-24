package com.mcdonalds.foodordering.model;

import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
public class Address extends BaseEntity {
    private String streetName;

    private String city;

    private String postalCode;

    private String instructions;
}
