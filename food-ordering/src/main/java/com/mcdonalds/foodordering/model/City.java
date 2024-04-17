package com.mcdonalds.foodordering.model;

import jakarta.persistence.Entity;
// import jakarta.persistence.JoinColumn;
// import jakarta.persistence.ManyToOne;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
public class City extends BaseEntity {
   private String name;

   // @ManyToOne
   // @JoinColumn
   // private Address address;
}
