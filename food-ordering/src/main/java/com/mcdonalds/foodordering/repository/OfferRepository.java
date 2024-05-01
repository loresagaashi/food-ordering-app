package com.mcdonalds.foodordering.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mcdonalds.foodordering.model.Offer;

public interface OfferRepository extends JpaRepository<Offer, Long> {
    Optional<Offer> findByName(String name);
}
