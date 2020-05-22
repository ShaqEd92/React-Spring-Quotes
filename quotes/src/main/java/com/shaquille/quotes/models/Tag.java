package com.shaquille.quotes.models;

import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "tag")
public class Tag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long tagId;

    @NotBlank
    @NotEmpty
    @NotNull
    private String name;

    @ManyToMany(fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            },
            mappedBy = "tag")
    private Set<Quote> quotes = new HashSet<>();

    public Tag() { }

    public long getId() {
        return tagId;
    }

    public void setId(long tagId) {
        this.tagId = tagId;
    }

    public Tag(String name) {
        this.name = name;
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
    public String toString(){
        return this.name;
    }

}
