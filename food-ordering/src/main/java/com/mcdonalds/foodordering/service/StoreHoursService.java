package com.mcdonalds.foodordering.service;

// import com.mcdonalds.foodordering.exception.NotFoundException;
import com.mcdonalds.foodordering.model.StoreHours;
import com.mcdonalds.foodordering.repository.StoreHoursRepository;

// import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

// import java.util.List;
// import java.util.Optional;

@Service
public class StoreHoursService extends BasicServiceOperations<StoreHoursRepository, StoreHours>{

    public StoreHoursService(StoreHoursRepository repository) {
        super(repository);
    }

}