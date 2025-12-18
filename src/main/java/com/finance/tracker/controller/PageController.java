package com.finance.tracker.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageController {
    @GetMapping("/")
    public String landingPage() {
        return "index"; // Serves templates/index.html
    }
}