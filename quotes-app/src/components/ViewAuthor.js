import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuotesForAuthor } from "../api/quotesApi";

const ViewTag = ({ setId }) => {
  let name = useParams().slug;

  const [author, setAuthor] = useState();
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    setAuthor(name);
    setId(null);
  }, [name, setId]);

  useEffect(() => {
    getQuotesForAuthor(name).then((_quotes) => setQuotes(_quotes));
  }, [name]);

  return (
    <>
      {author && (
        <div style={{ padding: "2%" }}>
          <div>{author}</div>
          {quotes.map((quote) => (
            <div className="quote-box">
              <p>
                "{quote.content}" by {quote.author}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ViewTag;
