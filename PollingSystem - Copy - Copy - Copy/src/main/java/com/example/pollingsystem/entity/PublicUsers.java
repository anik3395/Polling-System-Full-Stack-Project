package com.example.pollingsystem.entity;

import jakarta.persistence.*;

//users Update
@Entity
@Table
public class PublicUsers {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String username;  // Unique username
    private String password;  // Password for login
    private boolean isLoggedIn;

    public PublicUsers(){

    }

    public PublicUsers(String username , String password,boolean isLoggedIn){
        this.username = username;
        this.password=password;
        this.isLoggedIn=isLoggedIn;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isLoggedIn() {
        return isLoggedIn;
    }

    public void setLoggedIn(boolean loggedIn) {
        isLoggedIn = loggedIn;
    }


}
