package com.mcdonalds.foodordering.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

import static jakarta.persistence.CascadeType.ALL;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
public class StoreLocation extends BaseEntity {
    private String nameOfLocation;

    // @OneToOne
    // @JoinColumn
    // private Address address;

    @OneToMany(orphanRemoval = true, cascade = CascadeType.ALL)
    @JoinColumn(name = "store_location_id", foreignKey = @ForeignKey(name = "fk_store_hours_store_location", foreignKeyDefinition = "FOREIGN KEY (store_location_id) REFERENCES StoreLocation(id) ON DELETE RESTRICT"))
    private List<StoreHours> workingHours;
}
