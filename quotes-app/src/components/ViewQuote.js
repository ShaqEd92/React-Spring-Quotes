import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Label, Grid, Segment } from "semantic-ui-react";
import { getQuote } from "../api/quotesApi";
import "../App.css";

const ViewQuote = (props) => {
  let id = useParams().slug;

  const [quote, setQuote] = useState();

  useEffect(() => {
    getQuote(id).then((_quote) => setQuote(_quote));
    props.setId(id);
  }, [props, id]);

  return (
    <>
      {quote && (
        <div className="single-quote">
          <Grid.Column>
            <Segment raised size="huge">
              <Label as="a" color="violet" ribbon icon="pencil">
                {quote.author}
              </Label>
              {quote.content}
            </Segment>
          </Grid.Column>
          <br />
          {quote.tags.length === 0 ? (
            <Label as="a" color="#7A306C" tag>
              There are currently no tags
            </Label>
          ) : (
            quote.tags.map((t) => (
              <div className="quoteTags">
                <Label as="a" color="#7A306C" tag>
                  {t.name}
                </Label>{" "}
                &nbsp;
              </div>
            ))
          )}
        </div>
      )}
    </>
  );
};

export default ViewQuote;
