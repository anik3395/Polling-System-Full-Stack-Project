package com.example.pollingsystem.controller;

import com.example.pollingsystem.dto.ApiError;
import com.example.pollingsystem.entity.PublicUsers;
import com.example.pollingsystem.exception.InvalidDataExceptions;
import com.example.pollingsystem.service.AdminService;
import com.example.pollingsystem.service.PublicUsersService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CommonController {

    private final AdminService adminService;
    private final PublicUsersService publicUsersService;

    public CommonController(AdminService adminService, PublicUsersService publicUsersService) {
        this.adminService = adminService;
        this.publicUsersService = publicUsersService;
    }

    @PostMapping("/login")
    public ResponseEntity<String> adminLogin(@RequestBody PublicUsers user) {
        // Regular expression to validate email
        String emailRegex = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";

        // Check if the username matches the email regex
        if (user.getUsername().matches(emailRegex)) {
            adminService.adminLogin(user);
            return new ResponseEntity<>("Admin login successfully", HttpStatus.OK);
        } else {
            publicUsersService.loginUse(user);
            return new ResponseEntity<>("User login successfully", HttpStatus.OK);
        }
    }


    @PostMapping("/logout")
    public ResponseEntity<String> adminLogout(@RequestParam String userName) {
        // Regular expression to validate email
        String emailRegex = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";

        // Check if the username matches the email regex
        if (userName.matches(emailRegex)) {
            adminService.adminLogout(userName);
            return new ResponseEntity<>("Admin logout successfully", HttpStatus.OK);
        } else {
            publicUsersService.logoutUser(userName);
            return new ResponseEntity<>("User logout successfully", HttpStatus.OK);
        }
    }





    @ExceptionHandler(InvalidDataExceptions.class)
    public ResponseEntity<ApiError> handleVerifyException(InvalidDataExceptions exception) {
        return new ResponseEntity<>(
                new ApiError(HttpStatus.BAD_REQUEST, exception.getMessage(), List.of(exception.getMessage())),
                HttpStatus.BAD_REQUEST
        );
    }


}
