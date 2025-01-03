package com.example.pollingsystem.controller;


import com.example.pollingsystem.dto.ApiError;
import com.example.pollingsystem.entity.Admin;
import com.example.pollingsystem.entity.PublicUsers;
import com.example.pollingsystem.exception.InvalidDataExceptions;
import com.example.pollingsystem.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {

    private final AdminService adminService;
    @Autowired
    public AdminController(AdminService adminService){
        this.adminService = adminService;
    }


    /** Admin Register update */
    @PostMapping("/register")
    public ResponseEntity<String> adminRegister(@RequestBody Admin admin){
        adminService.registerAdmin(admin);
        return new ResponseEntity<>("Admin registered successfully",HttpStatus.OK);
    }


    /* Admin Login */
    @PostMapping("/login")
    public ResponseEntity<String>adminLogin(@RequestBody PublicUsers admin){
        adminService.adminLogin(admin);
        return new ResponseEntity<>("Admin login successfully",HttpStatus.OK);
    }


    /* Admin Logout */
    @PostMapping("/logout")
    public ResponseEntity<String> adminLogout(@RequestParam String email){
        adminService.adminLogout(email);
        return new ResponseEntity<>("Admin logout successfully",HttpStatus.OK);
    }




    //1.Register Admin and Calling registerAdmin method and used RequestBody
//    @PostMapping("/register")
//    public ResponseEntity<Admin> registerAdmin(@RequestBody Admin admin) {
//        Admin savedAdmin = adminService.registerAdmin(admin);
//        return new ResponseEntity<>(savedAdmin, HttpStatus.CREATED);
//    }


    //2.Admin Login and calling loginAdmin method..
//    @PostMapping("/login")
//    public String loginAdmin(@RequestParam String email, @RequestParam String password) {
//        if (adminService.loginAdmin(email, password)) {
//            return "Login Successful!";
//        } else {
//            return "Invalid Credentials!";
//        }
//    }



    //3.Get All Login Admin..
//    @GetMapping("/logged-in")
//    public ResponseEntity<List<Admin>> getLoggedInAdmins() {
//        List<Admin> admins = adminService.getLoggedInAdmins();
//        if (admins.isEmpty()) {
//            return ResponseEntity.noContent().build();
//        }
//        return ResponseEntity.ok(admins);
//    }


    //Exception Handling processing
    @ExceptionHandler(InvalidDataExceptions.class)
    public ResponseEntity<ApiError> handleVerifyException(InvalidDataExceptions exception) {
        return new ResponseEntity<>(
                new ApiError(HttpStatus.BAD_REQUEST, exception.getMessage(), List.of(exception.getMessage())),
                HttpStatus.BAD_REQUEST
        );
    }

}
