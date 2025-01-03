package com.example.pollingsystem.entity;

import jakarta.persistence.*;

@Entity
@Table
public class Answer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    //private long questionId;
    private String userName;
    private String answerText;

    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question question;//for new update$$



    //private String submittedBy; // User who submitted the answer


    public Answer(){

    }

    public Answer(String userName, String answerText,Question question) {
        //this.questionId = questionId;
        this.userName = userName;
        this.answerText = answerText;
        this.question =question;
        //this.submittedBy =submittedBy;

    }


    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

//    public Long getQuestionId() {
//        return questionId;
//    }
//
//    public void setQuestionId(Long questionId) {
//        this.questionId = questionId;
//    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getAnswerText() {
        return answerText;
    }

    public void setAnswerText(String answerText) {
        this.answerText = answerText;
    }

    public Question getQuestion() {
        return question;
    }

    public void setQuestion(Question question) {
        this.question = question;
    }



//    public String getSubmittedBy(){
//        return submittedBy;
//    }
//    public void setSubmittedBy(String submittedBy){
//        this.submittedBy = submittedBy;
//    }
}
