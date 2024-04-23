package com.mcdonalds.foodordering.model;

import jakarta.persistence.Entity;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
public class Category extends BaseEntity {
    @NotBlank
    private String name;
}
