package com.example.pollingsystem.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import org.springframework.http.HttpStatus;

import java.util.List;
public class ApiError {
    private HttpStatus code;
    private String message;

    @JsonInclude(JsonInclude.Include.NON_EMPTY) // Exclude empty collections
    private List<String> errors;
    public ApiError(HttpStatus code, String message, List<String> errors) {
        super();
        this.code = code;
        this.message = message;
        this.errors = errors;
    }

    public ApiError(HttpStatus httpStatus, String localizedMessage) {
        this.code = httpStatus;
        this.message = localizedMessage;
    }

    public int getCode() {
        return code.value();
    }
    @JsonIgnore
    public HttpStatus getHttpStatus() {
        return code;
    }
    public void setCode(HttpStatus code) {
        this.code = code;
    }
    public String getMessage() {return message;}
    public void setMessage(String message) {
        this.message = message;
    }
    public List<String> getErrors() {
        return errors;
    }
    public void setErrors(List<String> errors) {
        this.errors = errors;
    }}

