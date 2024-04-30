package com.mcdonalds.foodordering.model;

import jakarta.persistence.*;
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
    @JoinColumn(name = "store_location_id", nullable = false, foreignKey = @ForeignKey(name = "fk_employee_store_location", foreignKeyDefinition = "FOREIGN KEY (store_location_id) REFERENCES StoreLocation(id) ON DELETE RESTRICT"))
    private StoreLocation storeLocation;
}