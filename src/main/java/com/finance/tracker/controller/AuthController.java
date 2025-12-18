package com.finance.tracker.controller;

import com.finance.tracker.model.User;
import com.finance.tracker.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired private UserRepository userRepository;
    @Autowired private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    @GetMapping("/login")
    public User login(Principal principal) {
        // Return user details safely after successful Basic Auth
        return userRepository.findByUsername(principal.getName()).get();
    }
}