package com.shaquille.quotes.controllers;

import com.shaquille.quotes.models.Tag;
import com.shaquille.quotes.repositories.TagRepository;
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
@RequestMapping("/api/tags")
public class TagController {

    @Autowired
    private TagRepository tagRepository;

    @GetMapping
    public List<Tag> list(){
        return tagRepository.findAll();
    }

    @GetMapping("{id}")
    public Tag get(@PathVariable Long id){
//        Optional<Tag> tag = tagRepository.findById(id);
//        return tag.map(resp -> ResponseEntity.ok().body(resp))
//                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
        return tagRepository.getOne(id);
    }

    @PostMapping
    public ResponseEntity<Tag> create(@Valid @RequestBody Tag tag) throws URISyntaxException {
        Tag result = tagRepository.save(tag);
        return ResponseEntity.created(new URI("api/tag/" + result.getId())).body(result);
    }

    @PutMapping("{id}")
    public ResponseEntity<Tag> updateTag(@PathVariable Long id, @Valid @RequestBody Tag tag) throws URISyntaxException {
        Tag result = tagRepository.save(tag);
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteTag(@PathVariable Long id) {
        tagRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

}
