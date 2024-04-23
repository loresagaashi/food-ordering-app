package com.mcdonalds.foodordering.service;


import com.mcdonalds.foodordering.exception.EntityValidationException;
import com.mcdonalds.foodordering.exception.ExceptionPayload;
import org.springframework.stereotype.Service;


import com.mcdonalds.foodordering.model.Customer;
import com.mcdonalds.foodordering.repository.CustomerRepository;


@Service
public class CustomerService extends BasicServiceOperations<CustomerRepository,Customer>{
    public CustomerService(CustomerRepository repository) {
        super(repository);
    }

    public Customer login(String email, String password) {
        Customer customer = this.repository.findByEmail(email)
                .orElseThrow(() -> new EntityValidationException(ExceptionPayload.builder()
                        .code("WrongEmail")
                        .fieldName("email")
                        .rejectedValue(email)
                        .message("Wrong email")
                        .build())
                );
        if (!customer.getPassword().equals(password)) {
            throw new EntityValidationException(ExceptionPayload.builder()
                    .code("WrongPassword")
                    .fieldName("password")
                    .rejectedValue(password)
                    .message("Wrong password")
                    .build());
        }

        return customer;
    }
}
