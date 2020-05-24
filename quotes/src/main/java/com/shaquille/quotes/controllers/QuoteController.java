package com.shaquille.quotes.controllers;

import com.shaquille.quotes.models.Quote;
import com.shaquille.quotes.repos.QuoteRepository;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class QuoteController {

    @Autowired
    private QuoteRepository quoteRepository;

    @GetMapping("/quotes")
    public ResponseEntity<?> getQuotes(){
        Optional<List<Quote>> quotes = Optional.of(quoteRepository.findAll());
        return quotes.map(resp -> ResponseEntity.ok().body(resp))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/quote/{id}")
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
