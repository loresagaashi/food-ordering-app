package com.mcdonalds.foodordering.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.mcdonalds.foodordering.exception.AlreadyExistsException;
import com.mcdonalds.foodordering.exception.NotFoundException;
import com.mcdonalds.foodordering.model.Customer;
import com.mcdonalds.foodordering.model.Product;
import com.mcdonalds.foodordering.repository.CustomerRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomerService {
    
    private final CustomerRepository customerRepository;

    public List<Customer> getCustomers() {
        return customerRepository.findAll();
    }
    
    public Customer addCustomer(Customer customer) {
        if(customerAlreadyExists(customer.getEmail())) {
            throw new AlreadyExistsException(customer.getEmail()+" Customer already Exists!");
        }
        return customerRepository.save(customer);
    }

    public Customer updateCustomer(Customer customer, Long id) {
        return customerRepository.findById(id).map(c -> {
            c.setFirstName(customer.getFirstName());
            c.setLastName(customer.getLastName());
            c.setEmail(customer.getEmail());
            c.setBirthDate(customer.getBirthDate());
            c.setPhoneNumber(customer.getPhoneNumber());
            c.setPassword(customer.getPassword());
            c.setTotalBonusPoints(customer.getTotalBonusPoints());
            // c.setAddress(customer.getAddress());
            return customerRepository.save(c);
        }).orElseThrow(() -> new NotFoundException("This Customer could not be found"));
    }

    public Customer getCustomerById(Long id) {
        return customerRepository.findById(id).orElseThrow(() -> new NotFoundException("No Customer found with this Id: "+id));
    }

    public void deleteCustomer(Long id) {
        if (!customerRepository.existsById(id)) {
            throw new NotFoundException("No Customer found with this Id: "+id);
           }
           customerRepository.deleteById(id);
    }

    public List<Product> getFavoriteProducts(Long id) {
        return customerRepository.findFavoriteProductsByCustomerId(id);
    }

    private boolean customerAlreadyExists(String email) {
        return customerRepository.findByEmail(email).isPresent();
    }
}
