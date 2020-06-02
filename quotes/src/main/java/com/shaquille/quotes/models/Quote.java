package com.shaquille.quotes.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity(name = "quotes")
public class Quote implements Comparable<Quote>{

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

    public Quote(@NotBlank @NotEmpty @NotNull String content, @NotBlank @NotEmpty @NotNull String author) {
        this.content = content;
        this.author = author;
        this.tags = new HashSet<>();
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

    public void addTag(Tag tag){
        this.tags.add(tag);
    }

    @Override
    public String toString() {
        return "'" + content + "' by " + author;
    }

    @Override
    public int compareTo(Quote o) {
        return 0;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Quote quote = (Quote) o;
        return content.equals(quote.content);
    }

    @Override
    public int hashCode() {
        return Objects.hash(content);
    }
}
