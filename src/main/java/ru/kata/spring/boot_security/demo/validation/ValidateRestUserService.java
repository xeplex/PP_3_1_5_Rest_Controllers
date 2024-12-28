package ru.kata.spring.boot_security.demo.validation;

import ru.kata.spring.boot_security.demo.model.User;

public interface ValidateRestUserService {
    Boolean validateByUsername(User user);

    Boolean validateByEmail(User user);

    Boolean validateUpdateUser(User user, Long id);

    Boolean validateByAge(User user);
}
