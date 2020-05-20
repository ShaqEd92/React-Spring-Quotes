package com.shaquille.quotes.models;


import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import org.springframework.lang.NonNull;
import java.util.List;

@Entity
public class Quote {

    @Id
    @GeneratedValue
    private Long id;

    @NonNull
    private String content;

    @NonNull
    private String author;

    private List<String> tags;

    public Quote() { };

    public Quote(String content, String author) {
        this.content = content;
        this.author = author;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public List<String> getTags() {
        return tags;
    }

    public void setTags(List<String> tags) {
        this.tags = tags;
    }

    @Override
    public String toString(){
        return "'" + content + "' by " + author;
    }

}
