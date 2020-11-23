import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuotesForTag } from "../api/quotesApi";
import { getTag } from "../api/tagsApi";

const ViewTag = ({ setId }) => {
  let id = useParams().slug;

  const [tag, setTag] = useState();
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    getTag(id).then((_tag) => setTag(_tag));
    setId(null);
  }, [id, setId]);

  useEffect(() => {
    if (tag) getQuotesForTag(tag.name).then((_quotes) => setQuotes(_quotes));
  }, [tag]);

  return (
    <>
      {tag && (
        <div style={{ padding: "2%" }}>
          <div>{tag.name}</div>
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
