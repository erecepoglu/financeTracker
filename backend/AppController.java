package com.finance.backend;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.Map;

@Controller
public class AppController {
    // Serves the Thymeleaf HTML page
    @GetMapping("/login")
    public String login() {
        return "login";
    }
}

@RestController // This part talks to React
class ApiController {
    @GetMapping("/api/user")
    public Map<String, String> getUser(@AuthenticationPrincipal UserDetails user) {
        return Map.of("username", user.getUsername());
    }
}