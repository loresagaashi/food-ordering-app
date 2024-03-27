package com.mcdonalds.foodordering.service;

import java.util.List;

import com.mcdonalds.foodordering.model.Admin;

public interface IAdminService {

    Admin addAdmin(Admin admin);

    List<Admin> getAdmins();

    Admin updateAdmin(Admin admin, Long id);

    Admin getAdminById(Long id);

    void deleteAdmin(Long id);
}
