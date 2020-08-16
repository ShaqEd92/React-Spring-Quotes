import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  NavLink,
} from "react-router-dom";
import NavBar from "./components/NavBar";
import QuotesOrTagsList from "./components/QuotesOrTagsList";
import ViewQuote from "./components/ViewQuote";
import AddQuote from "./components/AddQuote";
import EditQuote from "./components/EditQuote";
import ViewTag from "./components/ViewTag";
import { getQuotes } from "./api/quotesApi";
import { getTags } from "./api/tagsApi";
import "./App.css";

const App = () => {
  const [quotes, setQuotes] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (quotes.length === 0) fetchData();
  });

  const fetchData = () => {
    getQuotes().then((_quotes) => setQuotes(_quotes));
    getTags().then((_tags) => setTags(_tags));
  };

  return (
    <Router>
      <NavBar></NavBar>

      <h1>
        <NavLink to="/view/quotes" activeClassName="active-view">
          Quotes&nbsp;
        </NavLink>
        |
        <NavLink to="/view/tags" activeClassName="active-view">
          &nbsp;Tags
        </NavLink>
      </h1>

      <Switch>
        <Route exact path="/">
          <Redirect to="/view/quotes" />
        </Route>
        <Route exact path="/view">
          <Redirect to="/view/quotes" />
        </Route>
        <Route path="/view/:slug">
          <QuotesOrTagsList quotes={quotes} tags={tags} />
        </Route>
        <Route path="/quote/:slug">
          <ViewQuote />
        </Route>
        <Route path="/add-quote">
          <AddQuote fetchData={fetchData} tags={tags} />
        </Route>
        <Route path="/edit-quote/:slug">
          <EditQuote />
        </Route>
        <Route path="/tag/:slug">
          <ViewTag />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
