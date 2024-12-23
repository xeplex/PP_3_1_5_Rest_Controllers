package ru.kata.spring.boot_security.demo.validation;

import org.springframework.ui.Model;
import ru.kata.spring.boot_security.demo.model.User;

public interface ValidateUserService {
    Boolean validateByUsername(User user, Model model);

    Boolean validateByEmail(User user, Model model);

    Boolean validateUpdateUser(User user, Long id, Model model);

    Boolean validateByAge(User user, Model model);
}
