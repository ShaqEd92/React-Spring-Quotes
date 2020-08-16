import React, {useEffect} from "react";
import { useParams } from "react-router-dom";
import { Card, Label } from "semantic-ui-react";
import _ from "underscore";
import "../App.css";

const QuotesOrTagsList = (props) => {
  let view = useParams().slug;

  const allQuotes = _.shuffle(props.quotes).map((q) => (
    <Card ui centered card key={q.id} style={{ cursor: "pointer" }}>
      <Card.Content description={q.content} />
      <Card.Content extra description={q.author} />
    </Card>
  ));

  const allTags = _.shuffle(props.tags).map((t) => (
    <p>
      <Label as="a" color="#7A306C" key={t.id} tag>
        {t.name}
      </Label>
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
