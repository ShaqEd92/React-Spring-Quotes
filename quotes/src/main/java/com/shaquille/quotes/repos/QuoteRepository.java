package com.shaquille.quotes.repos;

import com.shaquille.quotes.models.Quote;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuoteRepository extends JpaRepository<Quote, Long> {
    Long findByName(String name);
}


