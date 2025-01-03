package com.example.pollingsystem.service;


import com.example.pollingsystem.entity.Question;
import com.example.pollingsystem.exception.InvalidDataExceptions;
import com.example.pollingsystem.repository.QuestionRepository;
import com.example.pollingsystem.specification.QuestionFilterParams;
import com.example.pollingsystem.specification.QuestionFilterSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;


import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class QuestionService {

    private final QuestionRepository questionRepository;


    @Autowired
    public QuestionService(QuestionRepository questionRepository){
        this.questionRepository = questionRepository;
    }


    //1.Add a question to the database
    public Question addQuestionText(Question question) {
        if (questionRepository.existsByQuestionText(question.getQuestionText())) {
            throw new InvalidDataExceptions("The question already exists: " +
                    question.getQuestionText() + " Please post a unique question.");
        }

        if(question.getAnswerOptions() == null || question.getAnswerOptions().size() != 4){
            throw new InvalidDataExceptions("Exactly 4 answer options are required to post a question.");
        }

        // Validate answer options for duplicates
        validateAnswerOptions(question.getAnswerOptions());
        //System.out.println("Answer Options: " + question.getAnswerOptions());
        return questionRepository.save(question);

    }
    // Validate duplicate answer options
    private void validateAnswerOptions(List<String> answerOptions) {
        Set<String> uniqueOptions = new HashSet<>();
        for (String option : answerOptions) {
            if (!uniqueOptions.add(option)) {
                throw new InvalidDataExceptions("Duplicate answer option found: " + option);
            }
        }

    }


    //2.Get All question which question added Admin or Me.
    public List<Question> getAllQuestion() {
        return questionRepository.findAll();
    }


    //2**.Get All question by filtering operations which question added Admin
    public List<Question> getAllQuestion(String questionText,String postedBy) {
        QuestionFilterParams questionFilterParams = new QuestionFilterParams(questionText,postedBy);
        Specification<Question> specification =
                QuestionFilterSpecification.getFilteredQuestions(questionFilterParams);
        return questionRepository.findAll(specification);

    }


//    public List<Question> getQuestionBySpecificAdmin(String email) {
//        return questionRepository.findByPostBy(email);
//    }


    //3.Fetch questions with answer options by admin email
    public List<Question> getQuestionsWithAnswerOptionsByAdmin(String adminEmail) {
        return questionRepository.findByPostedBy(adminEmail);
    }
}
