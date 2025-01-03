package com.example.pollingsystem.repository;

import com.example.pollingsystem.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin,Long> {
    Optional<Admin> findByEmail(String email);
    Optional<Admin> findByEmailAndPassword(String email, String password);


//    List<Admin> findByIsLoggedIn(boolean isLoggedIn);





    //Optional<Admin> findByUserName(String userName);
}
