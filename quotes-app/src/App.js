import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import AddQuote from "./components/AddQuote";
import ViewQuote from "./components/ViewQuote";
import ViewTag from "./components/ViewTag";
import ViewAuthor from "./components/ViewAuthor";
import { getQuotes } from "./api/quotesApi";
import { getTags } from "./api/tagsApi";
import "./styles/App.css";

const App = () => {
  const [quotes, setQuotes] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (quotes.length === 0) fetchData();
  }, [quotes]);

  const fetchData = () => {
    getQuotes().then((_quotes) => setQuotes(_quotes));
    getTags().then((_tags) => setTags(_tags));
  };

  return (
    <>
      <NavBar quotes={quotes} setQuotes={setQuotes} />
      <Switch>
        <Route exact path="/">
          <HomePage quotes={quotes} tags={tags} />
        </Route>
        <Route path="/add-quote">
          <AddQuote quotes={quotes} setQuotes={setQuotes} tags={tags} />
        </Route>
        <Route path="/quote/:slug" component={ViewQuote} />
        <Route path="/tag/:slug" component={ViewTag} />
        <Route path="/author/:slug" component={ViewAuthor} />
      </Switch>
    </>
  );
};

export default App;
