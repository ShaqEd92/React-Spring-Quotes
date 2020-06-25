package com.shaquille.quotes.controller;

import com.shaquille.quotes.model.Quote;
import com.shaquille.quotes.model.QuoteAndTagWrapper;
import com.shaquille.quotes.model.Tag;
import com.shaquille.quotes.service.QuoteService;
import com.shaquille.quotes.service.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/quotes")
public class QuoteController {

    @Autowired
    private QuoteService quoteService;

    @Autowired
    private TagService tagService;

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

    @GetMapping("tag/{name}")
    public ResponseEntity<?> listQuotesForSpecificTag(@PathVariable String name) {
        Optional<List<Quote>> quotes = Optional.of(quoteService.listQuotesForSpecificTag(name));
        return quotes.map(resp -> ResponseEntity.ok().body(resp))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("author/{name}")
    public ResponseEntity<?> listQuotesForSpecificAuthor(@PathVariable String name) {
        Optional<List<Quote>> quotes = Optional.of(quoteService.listQuotesForSpecificAuthor(name));
        return quotes.map(resp -> ResponseEntity.ok().body(resp))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<Quote> createQuote(@RequestBody QuoteAndTagWrapper quoteAndTags) throws URISyntaxException {
        Quote quote = quoteService.createQuote(quoteAndTags.getTheQuote());
        HashSet<Tag> tags = new HashSet<>();
        for(Tag tag : quoteAndTags.getTheTags()){
            if(!tagService.doesTagExist(tag.getName())){
                tags.add(tagService.createTag(tag));
            } else {
                tags.add(tagService.findTag(tag.getName()));
            }
        }
        quoteService.assignTags(quote, tags);
        return ResponseEntity.created(new URI("api/quote/" + quote.getId())).body(quote);
    }

    @PutMapping("{id}")
    public ResponseEntity<Quote> editQuote(@PathVariable Long id, @RequestBody QuoteAndTagWrapper quoteAndTags){
        Optional<Quote> quote = Optional.of(quoteService.updateQuote(id, quoteAndTags.getTheQuote()));
        HashSet<Tag> tags = new HashSet<>();
        for(Tag tag : quoteAndTags.getTheTags()){
            if(!tagService.doesTagExist(tag.getName())){
                tags.add(tagService.createTag(tag));
            } else {
                tags.add(tagService.findTag(tag.getName()));
            }
        }
        quoteService.assignTags(quote.get(), tags);
        return quote.map(resp -> ResponseEntity.ok().body(resp))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteQuote(@PathVariable Long id) {
        quoteService.deleteQuote(id);
        return ResponseEntity.ok().build();
    }

}
