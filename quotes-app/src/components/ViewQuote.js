import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getQuote } from "../api/quotesApi";

const ViewQuote = () => {
  let id = useParams().slug;

  const [quote, setQuote] = useState();

  useEffect(() => {
    getQuote(id).then((_quote) => setQuote(_quote));
  }, [id]);

  return (
    <div className="single-quote">
      {quote && (
        <div className="single-card">
          <p className="quote-content">"{quote.content}"</p>
          <Link to={`/author/${quote.author}`}>
            <p className="quote-author">{quote.author}</p>
          </Link>
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
      )}
    </div>
  );
};

export default ViewQuote;
