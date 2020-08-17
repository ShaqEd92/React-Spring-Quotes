import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Label } from "semantic-ui-react";
import { getQuotesForTag } from "../api/quotesApi";
import { getTag } from "../api/tagsApi";
import "../App.css";

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
    <>
      {tag && (
        <div style={{ padding: "2%" }}>
          <Label as="a" color="#7A306C" size="huge" tag>
            {tag.name}
          </Label>
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
