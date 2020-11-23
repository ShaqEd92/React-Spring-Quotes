import React, { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import _ from "underscore";
import QuoteCard from "./QuoteCard";
import TagCard from "./TagCard";

const HomePage = ({ quotes, tags, setId }) => {
  let view = useParams().slug;

  useEffect(() => {
    setId(null);
  }, [quotes, setId]);

  const allQuotes = _.shuffle(quotes).map((quote) => (
    <QuoteCard quote={quote} />
  ));

  const allTags = _.shuffle(tags).map((tag) => <TagCard tag={tag} />);

  return (
    <div>
            <h1>
        <NavLink to="/view/quotes" activeClassName="active-view">
          Quotes&nbsp;
        </NavLink>
        |
        <NavLink to="/view/tags" activeClassName="active-view">
          &nbsp;Tags
        </NavLink>
      </h1>
      {view === "quotes" ? allQuotes : allTags}
    </div>
  );
};

export default HomePage;
