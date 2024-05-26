package com.mcdonalds.foodordering.service.authentication;

import com.mcdonalds.foodordering.model.Admin;
import com.mcdonalds.foodordering.model.UserAccount;
import com.mcdonalds.foodordering.repository.AdminRepository;
import com.mcdonalds.foodordering.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private AdminRepository adminRepository;
    @Autowired
    private CustomerRepository customerRepository;

    @Override
    public UserAccount loadUserByUsername(String email) throws UsernameNotFoundException {
        var admin = adminRepository.findByEmail(email);
        if (admin.isPresent()) {
            return admin.get();
        }

        return customerRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Email '" + email + "' not found!"));
    }

    public UserAccount loadUserById(Long id) {
        Optional<Admin> admin = adminRepository.findById(id);
        if (admin.isPresent()) {
            return admin.get();
        }

        return customerRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with id : " + id));
    }

}