package com.shaquille.quotes.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import com.shaquille.quotes.repos.QuoteRepository;
import com.shaquille.quotes.models.Quote;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class QuoteController {

    @Autowired
    private QuoteRepository quoteRepository;

    @GetMapping("/quotes")
    public List<Quote> getQuotes(){
        return quoteRepository.findAll();
    }

    @GetMapping("/quotes/{id}")
    public ResponseEntity<?> getQuote(@PathVariable Long id){
        Optional<Quote> quote = quoteRepository.findById(id);
        return quote.map(resp -> ResponseEntity.ok().body(resp))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/quote")
    public ResponseEntity<Quote> createQuote(@RequestBody Quote quote) throws URISyntaxException {
        Quote result = quoteRepository.save(quote);
        return ResponseEntity.created(new URI("api/quote/" + result.getId())).body(result);
    }


}
