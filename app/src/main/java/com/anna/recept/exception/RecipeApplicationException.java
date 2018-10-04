package com.anna.recept.exception;

public class RecipeApplicationException extends RuntimeException{
    public RecipeApplicationException(Errors error) {
        super(error.getCause());
    }
}
