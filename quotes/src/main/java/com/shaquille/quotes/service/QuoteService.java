package com.shaquille.quotes.service;

import com.shaquille.quotes.model.Quote;
import com.shaquille.quotes.model.QuoteAndTagWrapper;
import com.shaquille.quotes.repository.QuoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuoteService {

    @Autowired
    private QuoteRepository quoteRepository;

    public List<Quote> listQuotes() {
        return quoteRepository.findAll();
    }

    public Optional<Quote> getQuote(Long id) {
        return quoteRepository.findById(id);
    }

    public Quote createQuote(QuoteAndTagWrapper quoteWithTags){
        Quote quote = quoteWithTags.getTheQuote();
        quoteRepository.saveAndFlush(quote);
        return quote;
    }

    public void deleteQuote(Long id) {
        quoteRepository.deleteById(id);
    }

}

