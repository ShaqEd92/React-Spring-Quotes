package com.shaquille.quotes.controller;

import com.shaquille.quotes.model.Quote;
import com.shaquille.quotes.model.QuoteAndTagWrapper;
import com.shaquille.quotes.service.QuoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/quotes")
public class QuoteController {

    @Autowired
    private QuoteService quoteService;

    @GetMapping
    public ResponseEntity<?> listQuotes() {
        Optional<List<Quote>> quotes = Optional.of(quoteService.listQuotes());
        return quotes.map(resp -> ResponseEntity.ok().body(resp))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("{id}")
    public ResponseEntity<?> getQuote(@PathVariable Long id) {
        Optional<Quote> quote = quoteService.getQuote(id);
        return quote.map(resp -> ResponseEntity.ok().body(resp))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<Quote> createQuote(@Valid @RequestBody QuoteAndTagWrapper quoteWithTags) throws URISyntaxException {
        Quote quote = quoteService.createQuote(quoteWithTags);
        return ResponseEntity.created(new URI("api/quote/" + quote.getId())).body(quote);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteQuote(@PathVariable Long id) {
        quoteService.deleteQuote(id);
        return ResponseEntity.ok().build();
    }

}
