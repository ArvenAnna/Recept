package com.anna.recept.controller;

import com.anna.recept.exception.ReceptApplicationException;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.io.IOException;

@ControllerAdvice
public class GlobalExceptionController {

    @ExceptionHandler(ReceptApplicationException.class)
    public ResponseEntity<ObjectNode> handleCustomException(Exception ex) {
        ObjectNode error = JsonNodeFactory.instance.objectNode();
        error.put("message", ex.getMessage());
        error.put("cause", "CustomException");
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(IOException.class)
    public ResponseEntity<ObjectNode> handleIOException(Exception ex) {
        ObjectNode error = JsonNodeFactory.instance.objectNode();
        error.put("message", ex.getMessage());
        error.put("cause", "IOException");
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ObjectNode> handleIllegalArgumentException(Exception ex) {
        ObjectNode error = JsonNodeFactory.instance.objectNode();
        error.put("message", ex.getMessage());
        error.put("cause", "IllegalArgumentException");
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

}
