package ru.kata.spring.boot_security.demo.controller;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.exception_handler.NoSuchUserException;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;
import ru.kata.spring.boot_security.demo.validation.ValidateRestUserService;

import java.util.List;

@RestController
@RequestMapping("/api")
public class AdminRestController {

    private final UserService userService;
    private final ValidateRestUserService validateRestUserService;

    public AdminRestController(UserService userService, ValidateRestUserService validateRestUserService) {
        this.userService = userService;
        this.validateRestUserService = validateRestUserService;
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> showAllUsers() {
        return new ResponseEntity<>(userService.getAll(), HttpStatus.OK);
    }

    @PostMapping("/users")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        validateRestUserService.validateByUsername(user);
        validateRestUserService.validateByEmail(user);
        validateRestUserService.validateByAge(user);
        userService.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }

    @DeleteMapping("/users/{id}")
    public String deleteEmployee(@PathVariable Long id) {
        User user = userService.getById(id);
        if (user == null) {
            throw new NoSuchUserException("There is no user with ID = " + id + " in Database");
        }
        userService.delete(id);
        return "User  with ID = " + id + " was deleted";
    }

    @PatchMapping("/users/{id}")
    public String updateUser(@RequestBody User user,
                             @PathVariable("id") Long id) {
        if (user == null) {
            throw new NoSuchUserException("There is no user with ID = " + id + " in Database");
        }
        validateRestUserService.validateUpdateUser(user, id);
        validateRestUserService.validateByAge(user);
        userService.update(user, id);
        return "User with ID = " + id + " was updated";
    }
}
