package com.mcdonalds.foodordering.service;

// import java.util.List;

import org.springframework.stereotype.Service;

// import com.mcdonalds.foodordering.exception.AlreadyExistsException;
// import com.mcdonalds.foodordering.exception.NotFoundException;
import com.mcdonalds.foodordering.model.Address;
import com.mcdonalds.foodordering.repository.AddressRepository; 

// import lombok.RequiredArgsConstructor;

@Service
public class AddressService extends BasicServiceOperations<AddressRepository,Address> {

    public AddressService(AddressRepository repository) {
        super(repository);
    }
    
    
}
