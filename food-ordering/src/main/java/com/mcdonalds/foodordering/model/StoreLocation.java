package com.mcdonalds.foodordering.model;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

import static jakarta.persistence.CascadeType.ALL;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
public class StoreLocation extends BaseEntity {
    private String name;

    @OneToOne
    @JoinColumn
    private Address address;

    @OneToMany(orphanRemoval = true, cascade = ALL)
    @JoinColumn
    private List<StoreHours> workingHours;
}
