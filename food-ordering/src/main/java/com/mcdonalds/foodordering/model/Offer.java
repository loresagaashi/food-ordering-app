package com.mcdonalds.foodordering.model;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
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
    @JoinColumn
    private List<Product> products;

    private Integer bonusPoints;
}
