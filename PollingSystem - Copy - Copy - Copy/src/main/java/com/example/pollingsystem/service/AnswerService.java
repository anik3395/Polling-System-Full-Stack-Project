package com.example.pollingsystem.service;

import com.example.pollingsystem.entity.Answer;
import com.example.pollingsystem.entity.PublicUsers;
import com.example.pollingsystem.entity.Question;
import com.example.pollingsystem.exception.InvalidDataExceptions;
import com.example.pollingsystem.repository.AnswerRepository;
import com.example.pollingsystem.repository.PublicUsersRepository;
import com.example.pollingsystem.repository.QuestionRepository;
import com.example.pollingsystem.specification.AnswerFilterParams;
import com.example.pollingsystem.specification.AnswerFilterSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class AnswerService {
    private final AnswerRepository answerRepository;
    private final QuestionRepository questionRepository;
    private final PublicUsersRepository publicUsersRepository;

    @Autowired
    public AnswerService(AnswerRepository answerRepository, QuestionRepository questionRepository,
                         PublicUsersRepository publicUsersRepository) {
        this.answerRepository = answerRepository;
        this.questionRepository =questionRepository;
        this.publicUsersRepository =publicUsersRepository;
    }

    //1.Save this answer in Table
//    public Answer addAnswerText(Answer answer) {
//        return answerRepository.save(answer);
//    }


    //1.Get all answer by question id..
    public List<Answer> getAnswersByQuestionId(long questionId) {
        return answerRepository.findByQuestionId(questionId);
    }

    /*** 3.Valid user post a question's answer ***/
    public void postAnswer(long questionId, String userName, String answer) {

        //System.out.println(questionId+userName+answer);
     PublicUsers user = publicUsersRepository.findByUsername(userName)
             .orElseThrow(() -> new InvalidDataExceptions("User does not exist."));

        if (!user.isLoggedIn()) {
            throw new InvalidDataExceptions("You must be logged in to post an answer.");
        }

        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new InvalidDataExceptions("Question does not exist."));

        if(!question.getAnswerOptions().contains(answer)){
            throw new InvalidDataExceptions("Invalid answer. Please select from the available options.");
        }

//        boolean checkingOption = false;
//        for (String answerOption : question.getAnswerOptions()) {
//            System.out.println(answerOption+" answer option");
//            if (answerOption.equals(answer)) {
//                checkingOption = true;
//            }
//        }
//
//        System.out.println("answer: " + answer);
//
//
//
//        if (!checkingOption) {
//            throw new InvalidDataExceptions("Invalid answer. Please select from the available options.");
//        }


        // Ensure the user hasn't already answered this question
        if (answerRepository.existsByQuestionIdAndUserName(questionId, userName)) {
            throw new InvalidDataExceptions("You have already posted an answer for this question.");
        }

        /* Save the answer */
        Answer userAnswer = new Answer();
        userAnswer.setQuestion(question);
        userAnswer.setUserName(userName);
        userAnswer.setAnswerText(answer);

        answerRepository.save(userAnswer);

    }

    //3.Submit a unique question answer with checking all validation.
//    public Answer submitAnswerByUniqueName(Answer answer) {
//        /*a.find the unique question Id */
//        Question question = questionRepository.findById(answer.getQuestionId()).orElse(null);
//        if(question ==null){
//            throw new InvalidDataExceptions("Question not found. Please enter a valid question Id");
//        }
//
//        /*b.Validate the Unique user's name */
//        if(answerRepository.existsByUserName(answer.getUserName())){
//            throw new InvalidDataExceptions("Username already exists");
//        }
//
//        /*c.Validate the answerText */
//        if(!question.getAnswerOptions().contains(answer.getAnswerText())){
//            throw new InvalidDataExceptions("Invalid answer. Please select from the available options: "
//                    + question.getAnswerOptions());
//        }
//        return answerRepository.save(answer);
//    }

    /*2.Get all Submit answer from my Database's Table by find all method.*/
    public List<Answer> getAllSubmitAnswer() {
        return answerRepository.findAll();
    }


    //4.New Update for get answer or voting with question of Specific Public Users.//
    public List<Answer> getAnswersByUserName(String userName) {
        if(answerRepository.findByUserName(userName).isEmpty()){
            throw new InvalidDataExceptions("User does not exist or User does not post any answer.");
        }
       return answerRepository.findByUserName(userName);
    }


    /*3.Get answer count for a specific question by question id*/
    public Map<String, Object> getAnswerCountsByQuestionId(long questionId) {
        long totalAnswers = 0;
        /* Fetch the question from the repository */
        Optional<Question> questionOptional = questionRepository.findById(questionId);

        /* If the question is not found, throw an exception or handle it as needed */
        if (questionOptional.isEmpty()) {
            throw new InvalidDataExceptions("Question not found with ID: " + questionId);
        }

        String questionName = questionOptional.get().getQuestionText();

        /* Fetch all answers for the given question ID */
        List<Answer> answers = answerRepository.findByQuestionId(questionId);

        /* Store the count of each answer text */
        Map<String, Long> allAnswersCount = new LinkedHashMap<>();

        for (Answer answer : answers) {
            String answerText = answer.getAnswerText();
            allAnswersCount.put(answerText, allAnswersCount.getOrDefault(answerText, 0L) + 1);
            totalAnswers++;
        }
        allAnswersCount.put("Total Answers", totalAnswers);
        Map<String, Object> result = new LinkedHashMap<>();
        result.put(questionName, allAnswersCount);

        return result;
    }


    /*5.Admin seen his answer under questions*/
    public List<Answer> getAnswersByAdminEmail(String email) {
        if(answerRepository.findByQuestion_PostedBy(email).isEmpty()){
            throw new InvalidDataExceptions("Admin does not post any question.");
        }
       return answerRepository.findByQuestion_PostedBy(email);
    }


    /* search */
    public List<Answer> getAnswerBySearching(String answerText) {
        AnswerFilterParams answerFilterParams = new AnswerFilterParams(answerText);
        Specification<Answer> specification =
                AnswerFilterSpecification.getFilteredAnswer(answerFilterParams);
       List<Answer> answers = answerRepository.findAll(specification);

        if (answers.isEmpty()) {
            throw new InvalidDataExceptions("No answers found for the given text or word: " + answerText);
        }

         return answers;
    }


//    public Answer submitAnswer(Answer answer, String loggedInUserName) {
//        // Check if the user is logged in
//        if (!publicUsersService.isUserLoggedIn(loggedInUserName)) {
//            throw new InvalidDataExceptions("You must be logged in to post an answer.");
//        }
//
//        // Validate if the question exists
//        Question question = questionRepository.findById(answer.getQuestionId())
//                .orElseThrow(() -> new InvalidDataExceptions("Question not found."));
//
//        // Validate the answer options
//        if (!question.getAnswerOptions().contains(answer.getAnswerText())) {
//            throw new InvalidDataExceptions("Invalid answer. Please select from the available options: "
//                    + question.getAnswerOptions());
//        }
//
//        // Save the answer with the logged-in username
//        answer.setUserName(loggedInUserName);
//        return answerRepository.save(answer);
//    }


}
