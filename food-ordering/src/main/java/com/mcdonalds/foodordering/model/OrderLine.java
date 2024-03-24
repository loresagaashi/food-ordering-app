package com.mcdonalds.foodordering.model;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.math.BigDecimal;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
public class OrderLine extends BaseEntity {
    @OneToOne
    @JoinColumn
    private Product product;

    private BigDecimal price;

    private BigDecimal quantity;

    private BigDecimal amount;

    private String notes;
}
