package com.shaquille.quotes.controllers;

import com.shaquille.quotes.models.Quote;
import com.shaquille.quotes.models.QuoteWrapper;
import com.shaquille.quotes.models.Tag;
import com.shaquille.quotes.repositories.QuoteRepository;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import javax.validation.Valid;

import com.shaquille.quotes.repositories.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/quotes")
public class QuoteController {

    @Autowired
    private QuoteRepository quoteRepository;

    @Autowired
    private TagRepository tagRepository;

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
    public ResponseEntity<Quote> create(@Valid @RequestBody QuoteWrapper quoteWithTags) throws URISyntaxException {
        Quote quote = quoteWithTags.getTheQuote();
        for(Tag tag : quoteWithTags.getTheTags()) {
            quote.addTag(tag);
            tagRepository.save(tag);
        }
        quoteRepository.save(quote);
        return ResponseEntity.created(new URI("api/quote/" + quote.getId())).body(quote);
    }

    @PutMapping("{id}")
    public ResponseEntity<Quote> update(@PathVariable Long id, @Valid @RequestBody Quote quote) {
        Quote result = quoteRepository.save(quote);
        return ResponseEntity.ok(result);
    }

    @PutMapping("{id}/add")
    public ResponseEntity<Quote> addTag(@PathVariable Long id, @Valid @RequestBody Quote quote, @Valid @RequestBody Tag tag){
        Quote result = quoteRepository.getOne(id);
        Set<Tag> updatedTags = result.getTags();
        updatedTags.add(tag);
        result.setTags((HashSet<Tag>) updatedTags);
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        quoteRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

}
