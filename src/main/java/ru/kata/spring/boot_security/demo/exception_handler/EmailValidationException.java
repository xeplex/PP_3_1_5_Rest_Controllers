package ru.kata.spring.boot_security.demo.exception_handler;

public class EmailValidationException extends RuntimeException{
    public EmailValidationException(String message) {
        super(message);
    }
}
