import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, Label } from "semantic-ui-react";
import _ from "underscore";
import "../styles/App.css";

const QuotesOrTagsList = (props) => {
  let view = useParams().slug;

  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    setQuotes(props.quotes);
    props.setId(null);
  }, [props]);

  const allQuotes = _.shuffle(quotes).map((q) => (
    <Card ui centered card key={q.id} style={{ cursor: "pointer" }}>
      <Link to={`/quote/${q.id}`} className="card-content">
        <Card.Content description={q.content} />
      </Link>
      <Link to={`/author/${q.author}`} className="card-content">
        <Card.Content>
          <span style={{ fontStyle: "italic" }}>{q.author}</span>
        </Card.Content>
      </Link>
    </Card>
  ));

  const allTags = _.shuffle(props.tags).map((t) => (
    <p>
      <Link to={`/tag/${t.id}`}>
        <Label key={t.id} tag>
          <span style={{ fontSize: "1.25rem", color: "#7a306c" }}>
            {" "}
            {t.name}
          </span>
        </Label>
      </Link>
      <br />
    </p>
  ));

  return (
    <>
      <div id="quotes" className="ui grid container">
        {view === "quotes" ? allQuotes : allTags}
      </div>
    </>
  );
};

export default QuotesOrTagsList;
