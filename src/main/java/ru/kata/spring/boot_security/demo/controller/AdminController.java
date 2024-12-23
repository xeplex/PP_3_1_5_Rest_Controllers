package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;
import ru.kata.spring.boot_security.demo.validation.ValidateUserService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.security.Principal;
import java.util.List;

@Controller
@RequestMapping("/admin")
public class AdminController {

    private final UserService userService;
    private final RoleService roleService;
    private final ValidateUserService validateUserService;


    @Autowired
    public AdminController(UserService userService, RoleService roleService, ValidateUserService validateUserService) {
        this.userService = userService;
        this.roleService = roleService;
        this.validateUserService = validateUserService;
    }

    @GetMapping
    public String getUsers(Model model, Principal principal) {
        addCurrentUserToModel(model, principal);
        List<User> users = userService.getAll();
        for (User user : users) {
            user.setRoles(roleService.findRolesByUserId(user.getId()));
        }
        model.addAttribute("users", users);
        model.addAttribute("username", principal.getName());
        List<Role> roles = roleService.getAll();
        model.addAttribute("allRoles", roles);
        return "users";
    }

    @PostMapping("/saveUser")
    public String saveUser(@ModelAttribute("user") User user, Model model, Principal principal) {
        addCurrentUserToModel(model, principal);
        if (validateUserService.validateByUsername(user, model) ||
                validateUserService.validateByEmail(user, model) || validateUserService.validateByAge(user, model)) {
            return "users";
        }
        userService.save(user);
        return "redirect:/admin";
    }

    @DeleteMapping("/deleteUser")
    public String deleteUser(@RequestParam("id") Long id) {
        userService.delete(id);
        return "redirect:/admin";
    }

    @PatchMapping("/updateUser")
    public String updateUser(@ModelAttribute("user") User user,
                             @RequestParam("id") Long id, Model model) {
        if (validateUserService.validateUpdateUser(user, id, model) || validateUserService.validateByAge(user, model)) {
            return "users";
        }
        userService.update(user, id);
        return "redirect:/admin";
    }

    @PostMapping("/logout")
    public String logoutPage(HttpServletRequest request, HttpServletResponse response) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null) {
            new SecurityContextLogoutHandler().logout(request, response, auth);
        }
        return "redirect:/logout";
    }

    private void addCurrentUserToModel(Model model, Principal principal) {
        String username = principal.getName();
        User currentUser = userService.findByUsername(username);
        if (currentUser != null) {
            currentUser.setRoles(roleService.findRolesByUserId(currentUser.getId()));
            model.addAttribute("user", currentUser);
        } else {
            model.addAttribute("user", new User());
        }
    }
}
