package com.shaquille.quotes.model;

import java.util.List;

public class QuoteAndTagWrapper {

    private Quote theQuote;
    private List<Tag> theTags;

    public QuoteAndTagWrapper(Quote theQuote, List<Tag> theTags) {
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
