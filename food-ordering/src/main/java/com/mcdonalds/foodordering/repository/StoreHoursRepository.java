package com.mcdonalds.foodordering.repository;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.mcdonalds.foodordering.model.StoreHours;

    public interface StoreHoursRepository extends JpaRepository<StoreHours, Long>{

    //  Optional<StoreHours> findStoreHoursByStoreId(Long id);

}

