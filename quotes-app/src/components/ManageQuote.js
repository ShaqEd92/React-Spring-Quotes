import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { saveQuote, getQuote } from "../api/quotesApi";
import { getOtherTags } from "../api/tagsApi";
import QuoteForm from "./QuoteForm";
import ErrorAlert from "./ErrorAlert";

const ManageQuote = ({ quotes, setQuotes, tags, setId }) => {
  let history = useHistory();
  let id = useParams().slug;

  const [quote, setQuote] = useState({
    content: "",
    author: "",
    tags: [],
  });
  const [newTags, setNewTags] = useState([]);
  const [existingTags, setExistingTags] = useState([]);
  const [tagOptions, setTagOptions] = useState([]);
  const [invalidQuoteAuthor, setInvalidQuoteAuthor] = useState(false);
  const [invalidTag, setInvalidTag] = useState(false);

  useEffect(() => {
    setExistingTags(tags);
    setId(null);
  }, [tags, setId]);

  useEffect(() => {
    getOtherTags(id).then((_tags) => setTagOptions(_tags));
    getQuote(id).then((_quote) =>
      setQuote({
        content: _quote.content,
        author: _quote.author,
        tags: _quote.tags,
      })
    );
    setId(id);
  }, [id, setId]);

  const isValid = (str) => {
    const trimmedStr = str.trim();
    if (trimmedStr.length > 0) {
      return true;
    } else return false;
  };

  const updateTagOptions = (tag) => {
    const remainingTags = existingTags.filter((t) => t.name !== tag.name);
    setExistingTags(remainingTags);
  };

  const handleChange = ({ target }) => {
    setQuote({
      ...quote,
      [target.name]: target.value,
    });
  };

  const handleSelect = (event) => {
    setTimeout(() => {
      const newTag = {
        name: event.value,
      };
      setNewTags([...newTags, newTag]);
      updateTagOptions(newTag);
    }, 200);
  };

  const handleRemoveTag = (tag) => {
    const remainingTags = quote.tags.filter((t) => t.name !== tag.name);
    const updatedOptions = [...tagOptions, tag];
    setQuote({ ...quote, tags: remainingTags });
    setTagOptions(updatedOptions);
  };

  const handleTagSubmit = (event) => {
    event.preventDefault();
    let tag = event.target.addedTag.value;
    event.target.addedTag.value = "";
    if (isValid(tag)) {
      setTimeout(() => {
        const newTag = {
          name: tag,
        };
        setNewTags([...newTags, newTag]);
        updateTagOptions(newTag);
      }, 200);
    } else {
      setInvalidTag(true);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isValid(quote.content) && isValid(quote.author)) {
      const postData = {
        theQuote: quote,
        theTags: newTags,
      };
      saveQuote(postData).then((_quote) => setQuotes([...quotes, _quote]));
      history.push("/");
    } else {
      setInvalidQuoteAuthor(true);
    }
    setQuote({ content: "", author: "" });
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
        existingTags={existingTags}
        newTags={newTags}
        onSubmit={handleSubmit}
        onChange={handleChange}
        onSelect={handleSelect}
        onTagSubmit={handleTagSubmit}
      />
    </>
  );
};

export default ManageQuote;
