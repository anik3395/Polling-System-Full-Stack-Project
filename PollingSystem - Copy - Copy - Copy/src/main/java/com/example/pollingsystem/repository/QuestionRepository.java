package com.example.pollingsystem.repository;

import com.example.pollingsystem.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question,Long>,
        JpaSpecificationExecutor<Question> {
    boolean existsByQuestionText(String questionText);

    //List<Question> findByPostBy(String email);

    List<Question> findByPostedBy(String postedBy);

}
