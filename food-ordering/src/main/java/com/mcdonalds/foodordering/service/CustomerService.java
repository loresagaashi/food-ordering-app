package com.mcdonalds.foodordering.service;


import com.mcdonalds.foodordering.exception.EntityValidationException;
import com.mcdonalds.foodordering.exception.ExceptionPayload;
import org.springframework.stereotype.Service;


import com.mcdonalds.foodordering.model.Customer;
import com.mcdonalds.foodordering.model.UserAccount;
import com.mcdonalds.foodordering.repository.CustomerRepository;
// import org.springframework.security.crypto.password.PasswordEncoder;

import jakarta.persistence.EntityNotFoundException;


@Service
public class CustomerService extends BasicServiceOperations<CustomerRepository,Customer>{
    public CustomerService(CustomerRepository repository) {
        super(repository);
    }

     @Override
  public Customer save(Customer entity) {
    if (entity.getId() == null) {
    //   entity.setPassword(passwordEncoder.encode(entity.getPassword()));
        entity.setPassword(entity.getPassword());
    } else {
        Customer user = repository.findById(entity.getId())
          .orElseThrow(() -> new EntityNotFoundException("No entity found with id: " + entity.getId()));
      entity.setPassword(user.getPassword());
    }

    return super.save(entity);
  }

  @Override
  protected void validateEntity(Customer entity) throws EntityValidationException {

    Customer existingCustomer = repository.findByEmail(entity.getEmail()).orElse(null);

    if (existingCustomer != null && !existingCustomer.getId().equals(entity.getId())) {
      throw new EntityValidationException(ExceptionPayload.builder()
          .code("DuplicateEmail")
          .fieldName("email")
          .rejectedValue(entity.getEmail())
          .message("This email already exists")
          .build()
      );
    }
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
