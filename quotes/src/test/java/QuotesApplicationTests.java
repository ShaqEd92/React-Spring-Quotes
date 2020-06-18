import com.shaquille.quotes.model.Quote;
import com.shaquille.quotes.model.Tag;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
class QuotesApplicationTests {

    static class QuoteControllerTest {

        @Test
        void noDuplicateTags() {
            Quote quote = new Quote("Test quote", "Tester");
            Tag tag1 = new Tag("Same");
            Tag tag2 = new Tag("Same");
            Tag tag3 = new Tag("Different");
            quote.addTag(tag1);
            quote.addTag(tag2);
            quote.addTag(tag3);
            assertEquals(2, quote.getTags().size());
        }

    }
}
