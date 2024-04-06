package com.mcdonalds.foodordering.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.mcdonalds.foodordering.model.Address; 
import java.util.Optional;

public interface AddressRepository extends JpaRepository<Address, Long>{
   
    Optional<Address> findByPostalCode(String postalCode);

} 
    

