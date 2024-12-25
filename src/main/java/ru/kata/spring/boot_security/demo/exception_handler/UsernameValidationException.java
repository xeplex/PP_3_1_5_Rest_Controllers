package ru.kata.spring.boot_security.demo.exception_handler;

public class UsernameValidationException extends RuntimeException {
    public UsernameValidationException(String message) {
        super(message);
    }
}
