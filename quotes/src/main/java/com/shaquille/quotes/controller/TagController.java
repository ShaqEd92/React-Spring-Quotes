package com.shaquille.quotes.controller;

import com.shaquille.quotes.model.Tag;
import com.shaquille.quotes.repository.TagRepository;
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

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tags")
public class TagController {

    @Autowired
    private TagRepository tagRepository;

    @GetMapping
    public ResponseEntity<?> list(){
        Optional<List<Tag>> tags = Optional.of(tagRepository.findAll());
        return tags.map(resp -> ResponseEntity.ok().body(resp))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("{id}")
    public ResponseEntity<?> get(@PathVariable Long id){
        Optional<Tag> tag = tagRepository.findById(id);
        return tag.map(resp -> ResponseEntity.ok().body(resp))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<Tag> create(@Valid @RequestBody Tag tag) throws URISyntaxException {
        Tag result = tagRepository.save(tag);
        return ResponseEntity.created(new URI("api/tag/" + result.getId())).body(result);
    }

    @PutMapping("{id}")
    public ResponseEntity<Tag> update(@PathVariable Long id, @Valid @RequestBody Tag tag) {
        Tag result = tagRepository.save(tag);
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        tagRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

}
