import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import NavBar from "./components/NavBar";
import QuotesList from "./components/QuotesList";
import ViewQuote from "./components/ViewQuote";
import AddQuote from "./components/AddQuote";
import EditQuote from "./components/EditQuote";
import TagsList from "./components/TagsList";
import ViewTag from "./components/ViewTag";
import { getQuotes } from "./api/quotesApi";
import { getTags } from "./api/tagsApi";
import "./App.css";

const App = () => {
  const [quotes, setQuotes] = useState([]);
  const [tags, setTags] = useState([]);
  // const [singleQuote, setSingleQuote] = useState({});
  // const [singleTag, setSingleTag] = useState([]);

  useEffect(() => {
    if (quotes.length === 0) getQuotes().then((_quotes) => setQuotes(_quotes));
    if (tags.length === 0) getTags().then((_tags) => setTags(_tags));
  });

  return (
    <Router>
      <NavBar></NavBar>

      <Switch>
        <Route exact path="/">
          <QuotesList quotes={quotes} />
        </Route>
        <Route path="/quote">
          <ViewQuote />
        </Route>
        <Route path="/add-quote">
          <AddQuote />
        </Route>
        <Route path="/edit-quote">
          <EditQuote />
        </Route>
        <Route path="/tags">
          <TagsList></TagsList>
        </Route>
        <Route path="/tag">
          <ViewTag tags={tags} />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
