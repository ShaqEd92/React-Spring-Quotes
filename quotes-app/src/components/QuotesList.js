import React from "react";
import { Card } from "semantic-ui-react";
import underscore from "underscore";
import "../App.css";

const QuotesList = (props) => {

  const allQuotes = underscore.shuffle(props.quotes).map((q) => (
    <Card ui centered card key={q.id} style={{ cursor: "pointer" }}>
      <Card.Content description={q.content} />
      <Card.Content extra description={q.author} />
    </Card>
  ));

  return (
    <>
      <h1 style={{ cursor: "pointer" }}>
        <span>Quotes&nbsp;</span>|<span>&nbsp;Tags</span>
      </h1>
      <div id="quotes" className="ui grid container">
        {allQuotes}
      </div>
    </>
  );
};

export default QuotesList;
