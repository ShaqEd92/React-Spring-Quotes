import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuotesForTag } from "../api/quotesApi";
import { getTag } from "../api/tagsApi";

const ViewTag = () => {
  let id = useParams().slug;

  const [tag, setTag] = useState();
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    getTag(id).then((_tag) => setTag(_tag));
  }, [id]);

  useEffect(() => {
    if (tag) getQuotesForTag(tag.name).then((_quotes) => setQuotes(_quotes));
  }, [tag]);

  return (
    <div className="single-tag">
      {tag && (
        <>
          <p className="tag-card">{tag.name}</p>
          {quotes.map((quote) => (
            <div className="tag-quotes">
              <p className="quote-card">
                "{quote.content}" by {quote.author}
              </p>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default ViewTag;
