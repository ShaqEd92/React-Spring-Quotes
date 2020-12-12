import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getQuotesForAuthor } from "../api/quotesApi";

const ViewAuthor = () => {
  let name = useParams().slug;

  const [author, setAuthor] = useState();
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    setAuthor(name);
  }, [name]);

  useEffect(() => {
    getQuotesForAuthor(name).then((_quotes) => setQuotes(_quotes));
  }, [name]);

  return (
    <div className="single-tag">
      {author && (
        <>
          <p className="tag-card">{author}</p>
          {quotes.map((quote) => (
            <div className="tag-quotes">
              <div className="single-card">
                <p className="quote-content">"{quote.content}"</p>
                <hr />
                {quote.tags.length === 0 ? (
                  <p className="no-tags">There are currently no tags</p>
                ) : (
                  <div className="quote-tags">
                    <p className="quote-content">Tags</p>
                    {quote.tags.map((tag) => (
                      <Link to={`/tag/${tag.id}`}>
                        <span>{tag.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default ViewAuthor;
