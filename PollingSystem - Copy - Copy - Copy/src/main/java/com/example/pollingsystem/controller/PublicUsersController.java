package com.example.pollingsystem.controller;

import com.example.pollingsystem.dto.ApiError;
import com.example.pollingsystem.entity.PublicUsers;
import com.example.pollingsystem.exception.InvalidDataExceptions;
import com.example.pollingsystem.service.PublicUsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PublicUsersController {

    private final PublicUsersService publicUsersService;

    @Autowired
    public PublicUsersController(PublicUsersService publicUsersService) {
        this.publicUsersService = publicUsersService;
    }


    //1.User Register.
  @PostMapping("/users/register")
  public ResponseEntity<String> registerUser(@RequestBody PublicUsers publicUsers){
        publicUsersService.registerUser(publicUsers);
        return new ResponseEntity<>("User registered successfully!",HttpStatus.OK);
  }



  /* Not used this login and logout part because admin and user login and logout button is same.*/
  //2. login a user
  @PostMapping("/users/login")
  public ResponseEntity<String> loginUser(@RequestBody PublicUsers publicUsers){
        publicUsersService.loginUse(publicUsers);
        return new ResponseEntity<>("User login successfully",HttpStatus.OK);
  }

    /*** Log out users ***/
    @PostMapping("/users/logout")
    public ResponseEntity<String>logoutUser(@RequestParam String userName){
        publicUsersService.logoutUser(userName);
        return new ResponseEntity<>("User logged out successfully.", HttpStatus.OK);
    }

  //3.Get all Logged-in users
  // Endpoint to get all logged-in users
//  @GetMapping("/users/logged-in")
//  public List<PublicUsers> getLoggedInUsers() {
//      return publicUsersService.getLoggedInUsers();
//  }



    //1.Register a new public user
//    @PostMapping("/users/register")
//    public PublicUsers registerUser(@RequestBody PublicUsers publicUsers) {
//        return publicUsersService.registerUser(publicUsers);
//    }

    //2.Public User Login
//    @PostMapping("/users/login")
//    public ResponseEntity<String> loginUser(@RequestBody PublicUsers publicUsers) {
//        String message = publicUsersService.loginUser(publicUsers);
//        return ResponseEntity.ok(message);
//    }

    //3.get all logged-in list
//    @GetMapping("/users/logged-in")
//    public List<PublicUsers> getLoggedInUsers(){
//        return publicUsersService.getLoggedInUsers();
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
