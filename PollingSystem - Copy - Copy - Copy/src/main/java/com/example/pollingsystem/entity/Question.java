package com.example.pollingsystem.entity;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String questionText;

    @ElementCollection
    private List<String> answerOptions;

    private String postedBy;


    public Question(){

    }

    public Question(String questionText,List<String> answerOptions,String postedBy){
        this.questionText = questionText;
        this.answerOptions =answerOptions;
        this.postedBy =postedBy;
    }

    public long getId(){
        return id;
    }
    public void setId(long id){
        this.id = id;
    }

    public String getQuestionText(){
        return questionText;
    }
    public void setQuestionText(String questionText){
        this.questionText=questionText;
    }

    public List<String>getAnswerOptions(){
        return answerOptions;
    }

    public void setAnswerOptions(List<String> answerOptions){
        this.answerOptions=answerOptions;

    }

    public String getPostedBy() {
        return postedBy;
    }

    public void setPostedBy(String postedBy) {
        this.postedBy = postedBy;
    }
}
