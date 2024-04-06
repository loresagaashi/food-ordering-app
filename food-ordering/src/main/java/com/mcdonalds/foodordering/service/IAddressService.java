package com.mcdonalds.foodordering.service;

import java.util.List;

import com.mcdonalds.foodordering.model.Address;

public interface IAddressService {

    Address addAddress(Address address);

    List<Address> getAddresses();

    Address updateAddress(Address address, Long id);

    Address getAddressById(Long id);

    void deleteAddress(Long id);
}
