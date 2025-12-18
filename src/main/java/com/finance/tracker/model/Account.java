package com.finance.tracker.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "accounts")
@Data
public class Account {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private Double balance;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}