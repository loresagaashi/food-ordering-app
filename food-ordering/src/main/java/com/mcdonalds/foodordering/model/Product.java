package com.mcdonalds.foodordering.model;

import jakarta.persistence.*;
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

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false, foreignKey = @ForeignKey(name = "fk_product_category", foreignKeyDefinition = "FOREIGN KEY (category_id) REFERENCES Category(id) ON DELETE RESTRICT"))
    private Category category;

    private Integer bonusPoints;
}
