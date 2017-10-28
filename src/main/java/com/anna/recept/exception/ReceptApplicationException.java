package com.anna.recept.exception;

public class ReceptApplicationException extends RuntimeException{
    public ReceptApplicationException(Errors error) {
        super(error.getCause());
    }
}
