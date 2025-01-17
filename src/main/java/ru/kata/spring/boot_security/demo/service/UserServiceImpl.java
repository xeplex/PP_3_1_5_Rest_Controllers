package ru.kata.spring.boot_security.demo.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.demo.dao.UserRepository;
import ru.kata.spring.boot_security.demo.exception_handler.NoSuchUserException;
import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public List<User> getAll() {
        return userRepository.findAll();
    }

    @Override
    @Transactional
    public User getById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    @Override
    @Transactional
    public void save(User user) {
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        if (user.getUsername() == null) {
            throw new IllegalArgumentException("Введите никнейм");
        }
        if (user.getEmail() == null) {
            throw new IllegalArgumentException("Введите почту");
        }
        if (user.getAge() == null) {
            throw new IllegalArgumentException("Введите возраст");
        }
        if (user.getRoles() == null) {
            throw new IllegalArgumentException("Выберите хотя бы одну роль");
        }
        userRepository.save(user);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        User user = getById(id);
        if (user == null) {
            throw new NoSuchUserException("There is no user with ID = " + id + " in Database");
        }
        userRepository.deleteById(id);
    }

    @Override
    @Transactional
    public void update(User user, Long id) {
        User existingUser = getById(id);
        if (existingUser != null) {
            existingUser.setUsername(user.getUsername());
            existingUser.setEmail(user.getEmail());
            existingUser.setAge(user.getAge());
            existingUser.setRoles(user.getRoles());
            if (user.getPassword() != null && !user.getPassword().isEmpty()) {
                String encodedPassword = passwordEncoder.encode(user.getPassword());
                existingUser.setPassword(encodedPassword);
            }
            userRepository.save(existingUser);
        } else {
            throw new NoSuchUserException("There is no user with ID = " + id + " in Database");
        }
    }


    @Override
    @Transactional
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    @Transactional
    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    @Transactional
    public Boolean existsByUsername(String username) {
        return userRepository.findByUsername(username) != null;
    }

    @Override
    @Transactional
    public Boolean existsByEmail(String email) {
        return userRepository.findByEmail(email) != null;
    }
}
