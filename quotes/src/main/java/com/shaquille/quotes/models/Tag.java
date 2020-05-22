package com.shaquille.quotes.models;

import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "tags")
public class Tag {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long tag_id;

    @NotBlank
    @NotEmpty
    @NotNull
    private String name;

    @ManyToMany(fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            },
            mappedBy = "tags")
    private Set<Quote> quotes = new HashSet<>();

    public Tag() { }

    public long getId() {
        return tag_id;
    }

    public void setId(long tag_id) {
        this.tag_id = tag_id;
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
