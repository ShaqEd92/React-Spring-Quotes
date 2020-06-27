package com.shaquille.quotes.controller;

import com.shaquille.quotes.service.QuoteService;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ExtendWith(SpringExtension.class)
@Tag("Controller")
class QuoteControllerTest {

    @MockBean
    private QuoteService quoteService;

    @Test
    void listQuotes() {
    }

    @Test
    void getQuote() {
    }

    @Test
    void listQuotesForSpecificTag() {
    }

    @Test
    void listQuotesForSpecificAuthor() {
    }

    @Test
    void createQuote() {
    }

    @Test
    void editQuote() {
    }

    @Test
    void deleteQuote() {
    }
}