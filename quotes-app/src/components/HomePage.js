import React, { useState } from "react";
import _ from "underscore";
import QuoteCard from "./QuoteCard";
import TagCard from "./TagCard";

const HomePage = ({ quotes, tags }) => {
  const [view, setView] = useState("quotes");

  const allQuotes = _.shuffle(quotes).map((quote) => (
    <QuoteCard quote={quote} />
  ));

  const allTags = _.shuffle(tags).map((tag) => <TagCard tag={tag} />);

  return (
    <div className="home-page">
      <main>
        <h1>
          <span
            onClick={() => setView("quotes")}
            style={view === "quotes" ? { fontWeight: "bold" } : null}
          >
            Quotes&nbsp;
          </span>
          |
          <span
            onClick={() => setView("tags")}
            style={view === "tags" ? { fontWeight: "bold" } : null}
          >
            &nbsp;Tags
          </span>
        </h1>
        <hr/>
        <section>
          {view === "quotes" && allQuotes}
          {view === "tags" && allTags}
        </section>
      </main>
    </div>
  );
};

export default HomePage;
