package com.finance.tracker.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "currency_rates")
@Data
public class CurrencyRate {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String currencyCode;
    private Double rateToUsd;
    private LocalDateTime lastUpdated;
}