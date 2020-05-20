package com.shaquille.quotes.repos;

import com.shaquille.quotes.models.Quote;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuoteRepository extends JpaRepository<Quote, Integer> {
    Integer findByName(String name);
}


