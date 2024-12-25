package ru.kata.spring.boot_security.demo.exception_handler;

public class AgeValidationException extends RuntimeException {
    public AgeValidationException(String message) {
        super(message);
    }
}
