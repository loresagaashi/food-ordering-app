package com.mcdonalds.foodordering.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.mcdonalds.foodordering.exception.AlreadyExistsException;
import com.mcdonalds.foodordering.exception.NotFoundException;
import com.mcdonalds.foodordering.model.Admin;
import com.mcdonalds.foodordering.repository.AdminRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final AdminRepository adminRepository;

    public List<Admin> getAdmins() {
        return adminRepository.findAll();
    }

    public Admin addAdmin(Admin admin) {
        if(adminAlreadyExists(admin.getEmail())){
            throw new AlreadyExistsException(admin.getEmail()+"Admin already Exists!");
        }
        return adminRepository.save(admin);
    }

    public Admin updateAdmin(Admin admin, Long id) {
        return adminRepository.findById(id).map(ad -> {
            ad.setFirstName(admin.getFirstName());
            ad.setLastName(admin.getLastName());
            ad.setEmail(admin.getEmail());
            ad.setBirthDate(admin.getBirthDate());
            ad.setPhoneNumber(admin.getPhoneNumber());
            ad.setPassword(admin.getPassword());
            return adminRepository.save(ad);
        }).orElseThrow(() -> new NotFoundException("This Admin could not be found"));
    }

    public Admin getAdminById(Long id) {
        return adminRepository.findById(id).orElseThrow(() -> new NotFoundException("No Admin found with this Id: "+id));
    }

    public void deleteAdmin(Long id) {
       if (!adminRepository.existsById(id)) {
        throw new NotFoundException("No Admin found with this Id: "+id);
       }
       adminRepository.deleteById(id);
    }

    //Method manually created
    private boolean adminAlreadyExists(String email) {
        return adminRepository.findByEmail(email).isPresent();
    }


}
