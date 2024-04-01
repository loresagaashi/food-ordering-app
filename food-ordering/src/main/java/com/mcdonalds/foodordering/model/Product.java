package com.mcdonalds.foodordering.model;

import jakarta.persistence.Entity;
// import jakarta.persistence.JoinColumn;
// import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.math.BigDecimal;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
public class Product extends BaseEntity {
    private String name;

    private String description;

    private BigDecimal price;

    // @ManyToOne
    // @JoinColumn
    // private Category category;

    private Integer bonusPoints;
}
