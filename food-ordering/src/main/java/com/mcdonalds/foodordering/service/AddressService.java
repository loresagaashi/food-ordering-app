package com.mcdonalds.foodordering.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.mcdonalds.foodordering.exception.AlreadyExistsException;
import com.mcdonalds.foodordering.exception.NotFoundException;
import com.mcdonalds.foodordering.model.Address;
import com.mcdonalds.foodordering.repository.AddressRepository; 


import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AddressService implements IAddressService {
    
    private final AddressRepository addressRepository;

    @Override
    public List <Address> getAddresses(){
        return addressRepository.findAll();
    }

    @Override
    public Address addAddress(Address address){
        if(addressAlreadyExists(address.getPostalCode())){
            throw new AlreadyExistsException(address.getPostalCode()+ "Address already exists!");
        }
        return addressRepository.save(address);
    }
    @Override
    public Address getAddressById(Long id) {
        return addressRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("No Address found with Id: " + id));
    }
      
    @Override
    public Address updateAddress(Address address, Long id){
        return addressRepository.findById(id).map(ad -> {
            ad.setStreetName(address.getStreetName());
            ad.setCity(address.getCity());
            ad.setPostalCode(address.getPostalCode());
            ad.setInstructions(address.getInstructions());
            return addressRepository.save(ad);
        }).orElseThrow(() -> new NotFoundException("This address could not be found"));
    }

    @Override
    public void deleteAddress(Long id) {
        if (!addressRepository.existsById(id)) {
            throw new NotFoundException("No address found with Id: " + id);
        }
        addressRepository.deleteById(id);
    }

    private boolean addressAlreadyExists(String postalcode) {
        return addressRepository.findByPostalCode(postalcode).isPresent();
    }

}
