package ru.kata.spring.boot_security.demo.exception;

public class UsernameValidationException extends RuntimeException {
    public UsernameValidationException(String message) {
        super(message);
    }
}
