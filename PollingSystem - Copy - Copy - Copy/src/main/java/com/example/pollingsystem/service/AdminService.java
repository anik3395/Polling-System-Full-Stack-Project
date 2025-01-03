package com.example.pollingsystem.service;

import com.example.pollingsystem.entity.Admin;
import com.example.pollingsystem.entity.PublicUsers;
import com.example.pollingsystem.exception.InvalidDataExceptions;
import com.example.pollingsystem.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AdminService {
    private  final List<String> loggedInAdmins = new ArrayList<>();

    private final AdminRepository adminRepository;
    @Autowired
    public AdminService(AdminRepository adminRepository){
        this.adminRepository = adminRepository;
    }


    public Admin registerAdmin(Admin admin) {
        Optional<Admin> existingAdmin = adminRepository.findByEmail(admin.getEmail());

        if (existingAdmin.isPresent()) {
            throw new InvalidDataExceptions("Admin with this email already exists.");
        }

        admin.setLoggedIn(false); // Ensure the admin is not logged in initially
        return adminRepository.save(admin);
    }

    public Admin adminLogin(PublicUsers admin) {
        Optional<Admin> existingAdmin = adminRepository.findByEmailAndPassword(
                admin.getUsername(), admin.getPassword());

        //System.out.println(admin);

        if (existingAdmin.isPresent()) {
            Admin fromDB = existingAdmin.get();

            if (fromDB.isLoggedIn()) {
                throw new InvalidDataExceptions("Admin is already logged in.");
            }
            fromDB.setLoggedIn(true);
            return adminRepository.save(fromDB);
        } else {
            throw new InvalidDataExceptions("Invalid email or password.");
        }

    }


    //1.Register Admin with email.
//    public Admin registerAdmin(Admin admin) {
//        if(adminRepository.existsByEmail(admin.getEmail())){
//            throw new InvalidDataExceptions("Admin with the same email already exists." +
//                    " Please choose another Email");
//        }
//        return adminRepository.save(admin);
//    }


    //2.Validate Admin login checked and save them in the loggedInAdmins list..
//    public boolean loginAdmin(String email, String password) {
//        // Fetch the Admin by email
//        Admin admin = adminRepository.findByEmail(email);
//        if (admin != null && admin.getPassword().equals(password)) {
//            loggedInAdmins.add(admin.getEmail());
//            loggedInAdmins.add(admin.getPassword());
//            return true;
//        }
//        return false;
//    }


    // Check if the admin is logged in based on their email and isLoggedIn status
    public boolean isAdminLoggedIn(String email) {
        Optional<Admin> adminOpt = adminRepository.findByEmail(email);

        if (adminOpt.isPresent()) {
            Admin admin = adminOpt.get();
            return admin.isLoggedIn(); // If the admin is logged in, return true
        } else {
            return false; // Admin doesn't exist or not logged in
        }
    }

    /* Admin Logout */
    public void adminLogout(String email) {
        Optional<Admin> existingAdmin = adminRepository.findByEmail(email);
        if(existingAdmin.isPresent()){
            Admin admin = existingAdmin.get();
            if(!admin.isLoggedIn()){
                throw new InvalidDataExceptions("admin is already logged out");
            }
            admin.setLoggedIn(false);
            adminRepository.save(admin);
        }else {
            throw new InvalidDataExceptions("Invalid email or user not logged in.please try again.");
        }

    }


    // Check if an admin is logged in
//    public boolean isAdminLoggedIn(String email) {
//        return loggedInAdmins.contains(email);
//    }



    //3.get all logged in list with just email..
//    public List<Admin> getLoggedInAdmins() {
//        return adminRepository.findByIsLoggedIn(true); // Fetch only logged-in admins
//    }

}
