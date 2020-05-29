package com.shaquille.quotes.models;

import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Entity(name = "tags")
public class Tag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tag_id;

    @NotBlank
    @NotEmpty
    @NotNull
    private String name;

    @ManyToMany(mappedBy = "tags")
    private Set<Quote> quotes = new HashSet<>();

    public Tag() {
    }

    public Tag(String name) {
        this.name = name;
    }

    public Long getId() {
        return tag_id;
    }

    public void setId(Long tag_id) {
        this.tag_id = tag_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Quote> getQuotes() {
        return quotes;
    }

    public void setQuotes(HashSet<Quote> quotes) {
        this.quotes = quotes;
    }

    @Override
    public String toString() {
        return this.name;
    }

}
