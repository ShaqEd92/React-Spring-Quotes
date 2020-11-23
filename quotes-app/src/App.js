import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import ManageQuote from "./components/ManageQuote";
import ViewQuote from "./components/ViewQuote";
import ViewTag from "./components/ViewTag";
import ViewAuthor from "./components/ViewAuthor";
import { getQuotes } from "./api/quotesApi";
import { getTags } from "./api/tagsApi";
import "./styles/App.css";

const App = () => {
  const [quotes, setQuotes] = useState([]);
  const [tags, setTags] = useState([]);
  const [id, setId] = useState(false);

  useEffect(() => {
    if (quotes.length === 0) fetchData();
  }, [quotes]);

  const fetchData = () => {
    getQuotes().then((_quotes) => setQuotes(_quotes));
    getTags().then((_tags) => setTags(_tags));
  };

  return (
    <>
      <NavBar id={id} quotes={quotes} setQuotes={setQuotes} />
      <Switch>
        <Route exact path="/">
          <HomePage quotes={quotes} tags={tags} />
        </Route>
        <Route path="/add-quote">
          <ManageQuote
            quotes={quotes}
            setQuotes={setQuotes}
            tags={tags}
            setId={setId}
          />
        </Route>
        <Route path="/edit-quote/:slug">
          <ManageQuote
            quotes={quotes}
            setQuotes={setQuotes}
            tags={tags}
            setId={setId}
          />
        </Route>
        <Route path="/quote/:slug">
          <ViewQuote setId={setId} />
        </Route>
        <Route path="/tag/:slug">
          <ViewTag setId={setId} />
        </Route>
        <Route path="/author/:slug">
          <ViewAuthor setId={setId} />
        </Route>
      </Switch>
    </>
  );
};

export default App;
