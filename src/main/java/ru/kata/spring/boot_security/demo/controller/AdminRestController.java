package ru.kata.spring.boot_security.demo.controller;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;
import ru.kata.spring.boot_security.demo.validation.ValidateRestUserService;

import java.security.Principal;
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
    public ResponseEntity<List<User>> showAll() {
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
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        userService.delete(id);
        return ResponseEntity.ok("User  with ID = " + id + " was deleted");
    }

    @PatchMapping("/users/{id}")
    public ResponseEntity<String> updateUser(@RequestBody User user,
                                             @PathVariable("id") Long id) {
        validateRestUserService.validateUpdateUser(user, id);
        validateRestUserService.validateByAge(user);
        userService.update(user, id);
        return ResponseEntity.ok("User  with ID = " + id + " was updated");
    }

    @GetMapping("/current")
    public ResponseEntity<User> getCurrent(Principal principal) {
        User user = userService.findByUsername(principal.getName());
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
}
