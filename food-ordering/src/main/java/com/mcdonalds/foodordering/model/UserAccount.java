package com.mcdonalds.foodordering.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@Entity
@Table
@AllArgsConstructor
public class UserAccount {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    // private String firstName;
    // private String lastName;
    private String fullName;

    private String email;

    private String password;

    // private Date birthDate;

    private String phoneNumber;

    private int bonusPoints;

    private RoleType role;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    private List<OrderDetail> order = new ArrayList<>();

    @ElementCollection
    private List<Product>favorites = new ArrayList();

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Address> addresses = new ArrayList();
}
