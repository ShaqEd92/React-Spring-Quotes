package com.shaquille.quotes.models;

import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Entity(name = "quotes")
public class Quote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long quote_id;

    @NotBlank
    @NotEmpty
    @NotNull
    private String content;

    @NotBlank
    @NotEmpty
    @NotNull
    private String author;

    @ManyToMany
    @JoinTable(
            name = "quote_tags",
            joinColumns = {@JoinColumn(name = "quote_id")},
            inverseJoinColumns = {@JoinColumn(name = "tag_id")})
    private Set<Tag> tags = new HashSet<>();

    public Quote() {
    }

    public Quote(String content, String author) {
        this.content = content;
        this.author = author;
    }

    public Long getId() {
        return quote_id;
    }

    public void setId(Long quote_id) {
        this.quote_id = quote_id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public Set<Tag> getTags() {
        return tags;
    }

    public void setTags(HashSet<Tag> tags) {
        this.tags = tags;
    }

    @Override
    public String toString() {
        return "'" + content + "' by " + author;
    }

}
