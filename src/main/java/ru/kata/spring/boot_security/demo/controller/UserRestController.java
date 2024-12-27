package ru.kata.spring.boot_security.demo.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;

@RestController("/api")
public class UserRestController {

//    private final UserService userService;
//
//    public UserRestController(UserService userService) {
//        this.userService = userService;
//    }
//
//    @GetMapping("/user")
//    public ResponseEntity<User> getCurrentUser(@AuthenticationPrincipal UserDetails userDetails) {
//        User user = userService.findByUsername(userDetails.getUsername());
//        return ResponseEntity.ok(user);
//    }
}
