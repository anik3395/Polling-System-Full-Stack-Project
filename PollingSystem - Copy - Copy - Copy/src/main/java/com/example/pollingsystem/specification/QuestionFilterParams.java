package com.example.pollingsystem.specification;

public class QuestionFilterParams {
    private String questionText;
    private String postedBy;


    public QuestionFilterParams(String questionText, String postedBy) {
        this.questionText = questionText;
        this.postedBy = postedBy;
    }


    public String getQuestionText() {
        return questionText;
    }

    public void setQuestionText(String questionText) {
        this.questionText = questionText;
    }

    public String getPostedBy() {
        return postedBy;
    }

    public void setPostedBy(String postedBy) {
        this.postedBy = postedBy;
    }
}
