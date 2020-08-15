import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { isNumber } from "underscore";
import NavBar from "./NavBar";
import QuoteList from "./QuoteList";
import AddQuote from "./AddQuote";
import EditQuote from "./EditQuote";
import "../styles/App.css";

const App = () => {
  const [loaded, setLoaded] = useState(false);
  const [quotes, setQuotes] = useState([]);
  const [tags, setTags] = useState([]);
  const [singleQuote, setSingleQuote] = useState({});
  const [singleTag, setSingleTag] = useState([]);
  const [view, setView] = useState("");
  const [homeView, setHomeView] = useState("quotes");
  const [activeItem, setActiveItem] = useState("");

  useEffect(() => {
    fetchData();
    setTimeout(() => {
      setLoaded(true);
      setView("home");
      setActiveItem("home");
    }, 2000);
  });

  const fetchQuotesData = async () => {
    const resp = await fetch("/api/quotes");
    const quotesData = await resp.json();
    setQuotes(quotesData);
  };

  const fetchTagsData = async () => {
    const resp = await fetch("/api/tags");
    const tagsData = await resp.json();
    setTags(tagsData);
  };

  const fetchData = () => {
    fetchQuotesData();
    fetchTagsData();
  };

  const fetchQuotesForTag = async () => {
    const resp = await fetch(`/api/quotes/tag/${singleTag[0].name}`);
    const data = await resp.json();
    setQuotes(data);
  };

  const fetchQuotesForAuthor = async (name) => {
    const resp = await fetch(`/api/quotes/author/${name}`);
    const data = await resp.json();
    setQuotes(data);
  };

  const handleClick = (id) => {
    if (id === "quotes" || id === "tags") {
      setHomeView(id);
      return true;
    }
    handleActiveItem(id);
    let oneQuote = quotes.filter((q) => q.id === id);
    setSingleQuote(oneQuote);
    setHomeView(oneQuote);
  };

  const handleTagClick = (id) => {
    handleActiveItem(id);
    let oneTag = tags.filter((t) => t.id === id);
    setSingleTag(oneTag);
    setTimeout(() => {
      fetchQuotesForTag();
      setHomeView("oneTag");
    }, 300);
  };

  // Component to show
  const handleViewChange = (show) => {
    if (show === "home") fetchQuotesData();
    setView(show);
  };

  // For main display component, determines what exactly is shown
  const handleHomeView = (show) => {
    setHomeView(show);
  };

  // For nav bar
  const handleActiveItem = (item) => {
    if (!isNumber(item)) handleViewChange(item);
    setActiveItem(item);
  };

  const handleDelete = async (id) => {
    console.log("clicked");
    await fetch(`/api/quotes/${id}`, {
      method: "DELETE",
    });
    window.location.reload();
  };

  {
    return (
      <Router>
        {!loaded ? (
          <img
            src="../loading.gif"
            className="loading"
            alt="loading wheel"
          ></img>
        ) : (
          <NavBar
            handleClick={handleActiveItem}
            handleHomeView={handleHomeView}
            handleDelete={handleDelete}
            activeItem={activeItem}
            homeView={homeView}
          />
        )}
        {view === "home" && (
          <QuoteList
            quotes={quotes}
            tags={tags}
            singleQuote={singleQuote[0]}
            singleTag={singleTag[0]}
            fetchQuotesForAuthor={fetchQuotesForAuthor}
            homeView={homeView}
            handleActiveItem={handleActiveItem}
            handleClick={handleClick}
            handleTagClick={handleTagClick}
            handleDelete={handleDelete}
          />
        )}
        {view === "add" && (
          <AddQuote tags={tags} handleViewChange={handleViewChange} />
        )}
        {view === "edit" && (
          <EditQuote
            tags={tags}
            singleQuote={singleQuote[0]}
            fetchData={fetchData}
            handleClick={handleClick}
            handleHomeView={handleHomeView}
            handleViewChange={handleViewChange}
          />
        )}
      </Router>
    );
  }
};

export default App;
