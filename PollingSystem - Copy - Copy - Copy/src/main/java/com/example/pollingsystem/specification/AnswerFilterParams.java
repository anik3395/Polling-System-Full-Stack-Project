package com.example.pollingsystem.specification;

public class AnswerFilterParams {
    private String answerText;

    public AnswerFilterParams(String answerText) {
        this.answerText = answerText;
    }

    public String getAnswerText() {
        return answerText;
    }

    public void setAnswerText(String answerText) {
        this.answerText = answerText;
    }
}
