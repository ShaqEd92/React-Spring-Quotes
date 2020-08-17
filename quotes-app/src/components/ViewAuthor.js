import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Label } from "semantic-ui-react";
import { getQuotesForAuthor } from "../api/quotesApi";
import "../App.css";

const ViewTag = (props) => {
  let name = useParams().slug;

  const [author, setAuthor] = useState();
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    setAuthor(name)
    props.setId(null);
  }, [name, props]);

  useEffect(() => {
    getQuotesForAuthor(name).then((_quotes) => setQuotes(_quotes));
  }, [name]);

  return (
    <>
      {author && (
        <div style={{ padding: "2%" }}>
          <Label as="a" color="#7A306C" size="huge" tag>
            {author}
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
