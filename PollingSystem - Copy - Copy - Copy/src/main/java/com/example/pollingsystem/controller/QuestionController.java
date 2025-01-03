package com.example.pollingsystem.controller;

import com.example.pollingsystem.dto.ApiError;
import com.example.pollingsystem.entity.Question;
import com.example.pollingsystem.exception.InvalidDataExceptions;
import com.example.pollingsystem.service.AdminService;
import com.example.pollingsystem.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

public class QuestionController {
    private final QuestionService questionService;
    private final AdminService adminService;

    @Autowired
    public QuestionController(QuestionService questionService,AdminService adminService){
        this.questionService =questionService;
        this.adminService =adminService;
    }


    //1.Add question in my Question Table.
    @PostMapping("/question/add")
    public ResponseEntity<String> addQuestionText(
            @RequestParam String email,
            @RequestBody Question question) {

        if (adminService.isAdminLoggedIn(email)) { /* Validate admin's login status */
            question.setPostedBy(email); /* which admin set the question,Set the admin email as the poster */
            questionService.addQuestionText(question);
            return new ResponseEntity<>("Question with answer options added successfully.", HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>("Only logged-in admins can post questions.", HttpStatus.FORBIDDEN);
        }
    }

    //2.Get All question which question added Admin or Me.
    @GetMapping("/questions/all")
    public List<Question> getAllQuestions(){
        return questionService.getAllQuestion();
    }


    //2**.Get All question by filtering or search operations which question added Admin
    @GetMapping("/question/all")
    public List<Question> getAllQuestions(
            @RequestParam(required = false) String questionText ,
            @RequestParam(required = false) String postedBy
    ){
        return questionService.getAllQuestion(questionText,postedBy);
    }


    //New Update??????????
    //Get All question by logged-in admin by his own email..
//    @GetMapping("/all")
//    public List<Question> getQuestionBySpecificAdmin(String email){
//        return questionService.getQuestionBySpecificAdmin(email);
//    }


    //3.Endpoint to get questions with answer options by admin email
    @GetMapping("/by-admin")
    public ResponseEntity<List<Question>> getQuestionsByAdmin(@RequestParam String adminEmail) {
        List<Question> questions = questionService.getQuestionsWithAnswerOptionsByAdmin(adminEmail);
        return new ResponseEntity<>(questions, HttpStatus.OK);
    }



    //Exception Handling processing
    @ExceptionHandler(InvalidDataExceptions.class)
    public ResponseEntity<ApiError> handleVerifyException(InvalidDataExceptions exception) {
        return new ResponseEntity<>(
                new ApiError(HttpStatus.BAD_REQUEST, exception.getMessage(), List.of(exception.getMessage())),
                HttpStatus.BAD_REQUEST
        );
    }
}
