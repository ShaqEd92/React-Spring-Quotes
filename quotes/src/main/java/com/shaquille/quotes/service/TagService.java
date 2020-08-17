package com.shaquille.quotes.service;

import com.shaquille.quotes.model.Quote;
import com.shaquille.quotes.model.Tag;
import com.shaquille.quotes.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TagService {

    @Autowired
    private TagRepository tagRepository;

    @Autowired
    private QuoteService quoteService;

    public List<Tag> listTags() {
        return tagRepository.findAll();
    }

    public List<Tag> listRemainingTags(Long id){
        Quote quote = quoteService.getQuote(id).get();
        List<Tag> otherTags = listTags()
                .stream()
                .filter(tag -> !quote.getTags().contains(tag))
                .collect(Collectors.toList());
        return otherTags;
    }

    public Optional<Tag> getTag(Long id) {
        return tagRepository.findById(id);
    }

    public Tag createTag(Tag tag) {
        return tagRepository.saveAndFlush(tag);
    }

    public void deleteTag(Long id) {
        tagRepository.deleteById(id);
    }

    public boolean doesTagExist(String tagName) {
        boolean doesExist = false;
        List<Tag> allTags = tagRepository.findAll();
        for (Tag tag : allTags) {
            if (tag.getName().equalsIgnoreCase(tagName)) doesExist = true;
        }
        return doesExist;
    }

    public Tag findTag(String name) {
        if (doesTagExist(name)) {
            List<Tag> allTags = tagRepository.findAll();
            for (Tag tag : allTags) {
                if (tag.getName().equalsIgnoreCase(name)) return tag;
            }
        }
        Tag tag = new Tag(name);
        return tag;
    }

}
