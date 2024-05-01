package com.mcdonalds.foodordering.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
public class Offer extends BaseAuditEntity {
    private String name;

    private BigDecimal price;

    private LocalDateTime startDateTime;

    private LocalDateTime endDateTime;

    private boolean disabled;

    @OneToMany
    @JoinColumn(name = "product_id", nullable = false, foreignKey = @ForeignKey(name = "fk_offer_product", foreignKeyDefinition = "FOREIGN KEY (product_id) REFERENCES Product(id) ON DELETE RESTRICT"))
    private List<Product> products;

    private Integer bonusPoints;
}
