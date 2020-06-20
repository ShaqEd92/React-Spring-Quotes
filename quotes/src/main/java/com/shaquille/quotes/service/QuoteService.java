package com.shaquille.quotes.service;

import com.shaquille.quotes.model.Quote;
import com.shaquille.quotes.model.Tag;
import com.shaquille.quotes.repository.QuoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class QuoteService {

    @Autowired
    private QuoteRepository quoteRepository;

    @Autowired
    private TagService tagService;

    public List<Quote> listQuotes() {
        return quoteRepository.findAll();
    }

    public Optional<Quote> getQuote(Long id) {
        return quoteRepository.findById(id);
    }

    public List<Quote> listQuotesForSpecificTag(String name) {
        List<Quote> allQuotes = listQuotes();
        Tag tag = tagService.findTag(name);
        List<Quote> quotesForTag = allQuotes.stream()
                .filter(quote -> quote.getTags().contains(tag))
                .collect(Collectors.toList());
        return quotesForTag;
    }

    public Quote createQuote(Quote quote) {
        quoteRepository.saveAndFlush(quote);
        return quote;
    }

    public void assignTags(Quote quote, HashSet<Tag> tags) {
        quote.setTags(tags);
        quoteRepository.saveAndFlush(quote);
    }

    public void deleteQuote(Long id) {
        quoteRepository.deleteById(id);
    }

}

