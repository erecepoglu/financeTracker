package com.finance.tracker.model;

import jakarta.persistence.*;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.List;

@Entity
@Table(name = "users")
@Data
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    private String preferredCurrency = "USD";

    @OneToMany(mappedBy = "user")
    @JsonIgnore // Prevent infinite recursion in JSON
    private List<Account> accounts;
}