package com.example.pollingsystem.service;

import com.example.pollingsystem.entity.PublicUsers;
import com.example.pollingsystem.exception.InvalidDataExceptions;
import com.example.pollingsystem.repository.PublicUsersRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class PublicUsersService {

    private final PublicUsersRepository publicUsersRepository;

    //private final Map<String, Boolean> loggedInUsers = new HashMap<>();
    //private final Map<String, Boolean> loggedInUsers = new HashMap<>();

    public PublicUsersService(PublicUsersRepository publicUsersRepository){
        this.publicUsersRepository = publicUsersRepository;
    }

    //1.User Register.
    public PublicUsers registerUser(PublicUsers publicUsers) {
        Optional<PublicUsers> existingUser = publicUsersRepository.findByUsername(
                publicUsers.getUsername());

        if(existingUser.isPresent()){
            throw new InvalidDataExceptions("Username already exists.");
        }
        publicUsers.setLoggedIn(false);
        return publicUsersRepository.save(publicUsers);
    }


    //User login
    public void loginUse(PublicUsers publicUsers) {
        Optional<PublicUsers> existingUser = publicUsersRepository.findByUsernameAndPassword(
                publicUsers.getUsername(),
                publicUsers.getPassword());

        if (existingUser.isPresent()) {
            PublicUsers users = existingUser.get();

            if (users.isLoggedIn()) {
                throw new InvalidDataExceptions("User is already logged in.");
            }

            users.setLoggedIn(true);
            publicUsersRepository.save(users);
        } else {
            throw new InvalidDataExceptions("Invalid username or password.");
        }

    }

    public void logoutUser(String userName) {
        Optional<PublicUsers> userOptional = publicUsersRepository.findByUsername(userName);
        if (userOptional.isPresent()) {
            PublicUsers user = userOptional.get();
            if (!user.isLoggedIn()) {
                throw new InvalidDataExceptions("User is already logged-out.");
            }
            user.setLoggedIn(false);
            publicUsersRepository.save(user);
        } else {
            throw new InvalidDataExceptions("User not found.");
        }
    }

    // Get all logged-in PublicUsers
//    public List<PublicUsers> getLoggedInUsers() {
//        List<PublicUsers> loggedInUsersList = new ArrayList<>();
//
//        // Iterate through the loggedInUsers map to find users who are logged in
//        for (Map.Entry<String, Boolean> entry : loggedInUsers.entrySet()) {
//            if (entry.getValue()) {  // Check if the user is logged in
//                // Find the PublicUser by username and add it to the list
//                Optional<PublicUsers> user = publicUsersRepository.findByUserName(entry.getKey());
//                if (user.isPresent()) {
//                    loggedInUsersList.add(user.get());
//                }
//            }
//        }
//
//        return loggedInUsersList;
//    }


    // Method to get all logged-in PublicUsers
//    public List<PublicUsers> getLoggedInUsers() {
//        return publicUsersRepository.findByIsLoggedIn(true); // Query users who are logged in
//    }



    // 2. Login a user


    //1.
//    public PublicUsers registerUser(PublicUsers publicUsers) {
//
//        Optional<PublicUsers> existingUser = publicUsersRepository.findByUserName(publicUsers.getUserName());
//        if (existingUser.isPresent()){
//            throw new InvalidDataExceptions("Username already exists.");
//        }
//        return publicUsersRepository.save(publicUsers);
//    }


    //2.
//    public String loginUser(PublicUsers publicUsers) {
//        Optional<PublicUsers> existingUser = publicUsersRepository.findByUserNameAndPassword(
//                publicUsers.getUserName(),
//                publicUsers.getPassword());
//
//        if (existingUser.isPresent()){
//            //loggedInUsers.put(publicUsers.getUserName(), true);
//            return "Login Successful!";
//        }
//        throw new InvalidDataExceptions("Invalid username or password.");
//
//    }



    // Check if a user is logged in
//    public boolean isUserLoggedIn(String userName) {
//        if (!loggedInUsers.containsKey(userName) || !loggedInUsers.get(userName)) {
//            throw new InvalidDataExceptions("You must be logged in to post an answer.");
//        }
//        return true;
//    }


    // 6. Get a list of currently logged-in users
//    public List<String> getLoggedInUserNames() {
//        List<String> loggedInUserList = new ArrayList<>();
//        for (Map.Entry<String, Boolean> entry : loggedInUsers.entrySet()) {
//            if (entry.getValue()) {
//                loggedInUserList.add(entry.getKey());
//            }
//        }
//        return loggedInUserList;
//    }



    //3.
//    public List<PublicUsers> getLoggedInUsers() {
//        return publicUsersRepository.findAll();
//    }
}
