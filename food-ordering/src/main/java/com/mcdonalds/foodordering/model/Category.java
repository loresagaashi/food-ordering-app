package com.mcdonalds.foodordering.model;

import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
public class Category extends BaseEntity {
    private String name;
    
}
