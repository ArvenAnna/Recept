package com.anna.recept.controller;

import com.anna.recept.exception.RecipeApplicationException;

import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.io.IOException;

import javax.persistence.EntityNotFoundException;

@ControllerAdvice
public class GlobalExceptionController {

    @ExceptionHandler(RecipeApplicationException.class)
    public ResponseEntity<ObjectNode> handleCustomException(Exception ex) {
        ObjectNode error = getJsonError(ex, "CustomException");
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ObjectNode> handleDataIntegrityViolationException(Exception ex) {
        ObjectNode error = getJsonError(ex, "DataIntegrityViolationException");
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ObjectNode> handleNotFoundException(Exception ex) {
        ObjectNode error = getJsonError(ex, "EntityNotFoundException");
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(IOException.class)
    public ResponseEntity<ObjectNode> handleIOException(Exception ex) {
        ObjectNode error = getJsonError(ex, "IOException");
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ObjectNode> handleIllegalArgumentException(Exception ex) {
        ObjectNode error = getJsonError(ex, "IllegalArgumentException");
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    private ObjectNode getJsonError(Exception ex, String exception) {
        ObjectNode error = JsonNodeFactory.instance.objectNode();
        error.put("message", ex.getMessage());
        error.put("stack", getStringStackTrace(ex.getStackTrace()));
        error.put("cause", exception);
        return error;
    }

    private String getStringStackTrace(StackTraceElement[] stackTraceElements) {
        String stack = "";
        for(StackTraceElement el : stackTraceElements) {
            stack += el.toString() + "\n";
        }
        return stack;
    }

}
