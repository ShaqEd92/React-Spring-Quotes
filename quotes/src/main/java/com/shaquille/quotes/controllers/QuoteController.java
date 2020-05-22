package com.shaquille.quotes.controllers;

import com.shaquille.quotes.repos.QuoteRepository;
import com.shaquille.quotes.models.Quote;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api")
public class QuoteController {

    @Autowired
    private QuoteRepository quoteRepository;

    @GetMapping("/quotes")
    public Iterable<Quote> getQuotes(){
        return quoteRepository.findAll();
    }

    @GetMapping("/quotes/{id}")
    public ResponseEntity<?> getQuote(@PathVariable Long id){
        Optional<Quote> quote = quoteRepository.findById(id);
        return quote.map(resp -> ResponseEntity.ok().body(resp))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/quote")
    public ResponseEntity<Quote> createQuote(@Valid @RequestBody Quote quote) throws URISyntaxException {
        Quote result = quoteRepository.save(quote);
        return ResponseEntity.created(new URI("api/quote/" + result.getId())).body(result);
    }

    @PutMapping("/quote/{id}")
    public ResponseEntity<Quote> updateQuote(@Valid @RequestBody Quote quote) throws URISyntaxException {
        Quote result = quoteRepository.save(quote);
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/quote/{id}")
    public ResponseEntity<?> deleteQuote(@PathVariable Long id) {
        quoteRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }


}
