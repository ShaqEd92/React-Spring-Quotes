package com.shaquille.quotes.controllers;

import com.shaquille.quotes.models.Quote;
import com.shaquille.quotes.repositories.QuoteRepository;
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
@RequestMapping("/api/quotes")
public class QuoteController {

    @Autowired
    private QuoteRepository quoteRepository;

    @GetMapping
    public ResponseEntity<?> list(){
        Optional<List<Quote>> quotes = Optional.of(quoteRepository.findAll());
        return quotes.map(resp -> ResponseEntity.ok().body(resp))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("{id}")
    public ResponseEntity<?> get(@PathVariable Long id){
        Optional<Quote> quote = quoteRepository.findById(id);
        return quote.map(resp -> ResponseEntity.ok().body(resp))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<Quote> create(@Valid @RequestBody Quote quote) throws URISyntaxException {
        Quote result = quoteRepository.save(quote);
        return ResponseEntity.created(new URI("api/quote/" + result.getId())).body(result);
    }

    @PutMapping("{id}")
    public ResponseEntity<Quote> update(@PathVariable Long id, @Valid @RequestBody Quote quote) throws URISyntaxException {
        Quote result = quoteRepository.save(quote);
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        quoteRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }


}
