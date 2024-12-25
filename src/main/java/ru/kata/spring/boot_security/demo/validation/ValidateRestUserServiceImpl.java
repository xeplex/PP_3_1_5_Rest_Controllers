package ru.kata.spring.boot_security.demo.validation;

import org.springframework.stereotype.Service;
import ru.kata.spring.boot_security.demo.model.User;

import java.util.Map;

@Service
public class ValidateRestUserServiceImpl implements ValidateRestUserService {
    @Override
    public void applyUpdates(User user, Map<String, Object> updates) {
        if (updates.containsKey("username")) {
            user.setUsername((String) updates.get("username"));
        }
        if (updates.containsKey("email")) {
            user.setEmail((String) updates.get("email"));
        }
        if (updates.containsKey("age")) {
            user.setAge((Integer) updates.get("age"));
        }
        if (updates.containsKey("password")) {
            user.setAge((Integer) updates.get("password"));
        }
    }
}
