package com.shaquille.quotes.repos;

import com.shaquille.quotes.models.Quote;
import org.springframework.data.repository.CrudRepository;

public interface QuoteRepository extends CrudRepository<Quote, Long> {

}


