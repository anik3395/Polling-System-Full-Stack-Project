package com.example.pollingsystem.repository;

import com.example.pollingsystem.entity.Answer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface AnswerRepository extends JpaRepository<Answer,Long> ,
        JpaSpecificationExecutor<Answer> {
    List<Answer> findByQuestionId(Long questionId);


    //boolean existsByUserName( String userName);

    boolean existsByQuestionIdAndUserName(Long questionId, String userName);

    List<Answer> findByUserName(String userName);

    List<Answer> findByQuestion_PostedBy(String email);
}
