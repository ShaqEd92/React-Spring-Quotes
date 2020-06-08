package com.shaquille.quotes.models;

import java.util.List;

public class QuoteWrapper {

    private Quote theQuote;
    private List<Tag> theTags;

    public QuoteWrapper(Quote theQuote, List<Tag> theTags) {
        this.theQuote = theQuote;
        this.theTags = theTags;
    }

    public Quote getTheQuote() {
        return theQuote;
    }

    public List<Tag> getTheTags() {
        return theTags;
    }

}
