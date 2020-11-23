import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getQuote } from "../api/quotesApi";

const ViewQuote = ({ setId }) => {
  let id = useParams().slug;

  const [quote, setQuote] = useState();

  useEffect(() => {
    getQuote(id).then((_quote) => setQuote(_quote));
    setId(id);
  }, [setId, id]);

  return (
    <>
      {quote && (
        <div className="single-quote">
          <div className="quote-box">
            <p>"{quote.content}"</p>
          </div>
          <Link
            to={`/author/${quote.author}`}
            style={{ textDecoration: "none", color: "#8e8dbe" }}
          >
            <p>{quote.author}</p>
          </Link>
          <br />
          {quote.tags.length === 0 ? (
            <div>
              <span style={{ fontSize: "1.25rem", color: "#7a306c" }}>
                There are currently no tags
              </span>
            </div>
          ) : (
            quote.tags.map((t) => (
              <div className="quote-tags">
                <Link to={`/tag/${t.id}`}>
                  <div>
                    <span style={{ fontSize: "1.25rem", color: "#7a306c" }}>
                      {t.name}
                    </span>
                  </div>
                </Link>
              </div>
            ))
          )}
        </div>
      )}
    </>
  );
};

export default ViewQuote;
