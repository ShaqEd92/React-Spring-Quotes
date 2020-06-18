package com.shaquille.quotes.service;

import com.shaquille.quotes.model.Tag;
import com.shaquille.quotes.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashSet;
import java.util.List;

public class TagService {

    @Autowired
    private TagRepository tagRepository;

    private Boolean doesTagExist(String tagName) {
        boolean doesExist = false;
        List<Tag> allTags = tagRepository.findAll();
        for (Tag tag : allTags) {
            if (tag.getName().equalsIgnoreCase(tagName)) doesExist = true;
        }
        return doesExist;
    }

    public HashSet<Tag> saveNewTags(List<Tag> tags) {
        HashSet<Tag> tagsReturned = new HashSet<>();
        for(Tag tag : tags){
            if(doesTagExist(tag.getName())) tagRepository.save(tag);
            tagsReturned.add(tag);
        }
        return tagsReturned;
    }

}
