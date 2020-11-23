import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { saveQuote } from "../api/quotesApi";
import QuoteForm from "./QuoteForm";
import ErrorAlert from "./ErrorAlert";

const ManageQuote = ({ quotes, setQuotes, tags }) => {
  let history = useHistory();

  const [quote, setQuote] = useState({
    content: "",
    author: "",
    tags: [],
  });
  const [newTag, setNewTag] = useState({ name: "" });
  const [invalidQuoteAuthor, setInvalidQuoteAuthor] = useState(false);
  const [invalidTag, setInvalidTag] = useState(false);

  const isValid = (str) => {
    const trimmedStr = str.trim();
    if (trimmedStr.length > 0) {
      return true;
    } else return false;
  };

  const handleChange = ({ target }) => {
    setQuote({
      ...quote,
      [target.name]: target.value,
    });
  };

  const handleTagChange = ({ target }) => {
    setNewTag({ name: target.value });
  };

  const handleSelect = ({ target }) => {
    let newTag = { name: target.value };
    setQuote({ ...quote, tags: [...quote.tags, newTag] });
  };

  const handleTagSubmit = (event) => {
    event.preventDefault();
    if (isValid(newTag.name)) {
      setQuote({ ...quote, tags: [...quote.tags, newTag] });
      setNewTag({ name: "" });
    } else {
      setInvalidTag(true);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isValid(quote.content) && isValid(quote.author)) {
      const postData = {
        theQuote: { content: quote.content, author: quote.author },
        theTags: quote.tags,
      };
      saveQuote(postData).then((_quote) => setQuotes([...quotes, _quote]));
      history.push("/");
    } else {
      setInvalidQuoteAuthor(true);
    }
    setQuote({ content: "", author: "", tags: [] });
  };

  return (
    <>
      {invalidQuoteAuthor && (
        <ErrorAlert
          onClose={() => setInvalidQuoteAuthor(false)}
          message="Quote and Author fields cannot be empty. If author is unknown, enter
          'Anonymous'."
        />
      )}
      {invalidTag && (
        <ErrorAlert
          onClose={() => setInvalidTag(false)}
          message="If adding new tag, field cannot be empty."
        />
      )}
      <QuoteForm
        quote={quote}
        tags={tags}
        newTag={newTag}
        onSubmit={handleSubmit}
        onChange={handleChange}
        onTagChange={handleTagChange}
        onSelect={handleSelect}
        onTagSubmit={handleTagSubmit}
      />
    </>
  );
};

export default ManageQuote;
