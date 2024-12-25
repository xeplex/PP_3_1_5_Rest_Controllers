package ru.kata.spring.boot_security.demo.validation;

import ru.kata.spring.boot_security.demo.model.User;

import java.util.Map;

public interface ValidateRestUserService {

    void applyUpdates(User user, Map<String, Object> updates);
}
