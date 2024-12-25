package ru.kata.spring.boot_security.demo.validation;

import org.springframework.stereotype.Service;
import ru.kata.spring.boot_security.demo.exception.AgeValidationException;
import ru.kata.spring.boot_security.demo.exception.EmailValidationException;
import ru.kata.spring.boot_security.demo.exception.UsernameValidationException;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

@Service
public class ValidateRestUserServiceImpl implements ValidateRestUserService {

    private final UserService userService;

    public ValidateRestUserServiceImpl(UserService userService) {
        this.userService = userService;
    }

    @Override
    public Boolean validateByUsername(User user) {
        if (userService.existsByUsername(user.getUsername())) {
            throw new UsernameValidationException("Пользователь с никнеймом " + user.getUsername() + " уже существует");
        }
        return false;
    }

    @Override
    public Boolean validateByEmail(User user) {
        if (userService.existsByEmail(user.getEmail())) {
            throw new EmailValidationException("Пользователь с почтой " + user.getEmail() + " уже существует");
        }
        return false;
    }

    @Override
    public Boolean validateUpdateUser(User user, Long id) {
        if (userService.existsByUsername(user.getUsername()) &&
                !userService.findByUsername(user.getUsername()).getId().equals(id)) {
            throw new UsernameValidationException("Пользователь с никнеймом " + user.getUsername() + " уже существует");
        }
        if (userService.existsByEmail(user.getEmail()) &&
                !userService.findByEmail(user.getEmail()).getId().equals(id)) {
            throw new EmailValidationException("Пользователь с почтой " + user.getEmail() + " уже существует");
        }
        return false;
    }

    @Override
    public Boolean validateByAge(User user) {
        if (user.getAge() < 1 || user.getAge() > 100) {
           throw new AgeValidationException("Пользователю не может быть " + user.getAge() + " лет.\n Возвраст должен" +
                   "быть в пределах от 1 года до 100 лет");
        }
        return false;
    }
}
