package com.finance.tracker.controller;

import com.finance.tracker.model.*;
import com.finance.tracker.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api")
public class ApiController {
    @Autowired private TransactionRepository transactionRepo;
    @Autowired private UserRepository userRepo;
    @Autowired private CategoryRepository categoryRepo;

    // Get Logged-in User's Transactions
    @GetMapping("/transactions")
    public List<Transaction> getTransactions(Principal principal) {
        User user = userRepo.findByUsername(principal.getName()).get();
        return transactionRepo.findByUserId(user.getId());
    }

    // Add Transaction
    @PostMapping("/transactions")
    public Transaction addTransaction(@RequestBody Transaction t, Principal principal) {
        User user = userRepo.findByUsername(principal.getName()).get();
        t.setUser(user);
        
        // Handle Category (Assuming ID is passed in a placeholder object or logic)
        // For simplicity, we fetch the category by ID if provided, else default to 1
        Long catId = (t.getCategory() != null) ? t.getCategory().getId() : 1L;
        t.setCategory(categoryRepo.findById(catId).orElse(null));
        
        return transactionRepo.save(t);
    }
}
