package com.mcdonalds.foodordering.repository;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.mcdonalds.foodordering.model.StoreHours;




    public interface StoreHoursRepository extends JpaRepository<StoreHours, Long>{



    
     List<String> findStoreHoursByStoreId(Long id);
     

}

