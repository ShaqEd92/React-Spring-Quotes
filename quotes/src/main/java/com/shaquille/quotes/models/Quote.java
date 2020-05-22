package com.shaquille.quotes.models;

import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "quote")
public class Quote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long quoteId;

    @NotBlank
    @NotEmpty
    @NotNull
    private String content;

    @NotBlank
    @NotEmpty
    @NotNull
    private String author;

    @ManyToMany(fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            })
    @JoinTable(name = "hasTag",
            joinColumns = { @JoinColumn(name = "quoteId") },
            inverseJoinColumns = { @JoinColumn(name = "tagId") })
    private Set<Tag> tags = new HashSet<>();

    public Quote() { };

    public Quote(String content, String author) {
        this.content = content;
        this.author = author;
    }

    public long getId() {
        return quoteId;
    }

    public void setId(long quoteId) {
        this.quoteId = quoteId;
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
    public String toString(){
        return "'" + content + "' by " + author;
    }

}
