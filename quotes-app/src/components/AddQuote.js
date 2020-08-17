import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Form } from "semantic-ui-react";
import Alert from "react-bootstrap/Alert";
import Select from "react-select";
import { saveQuote } from "../api/quotesApi";
import "../App.css";

const AddQuote = (props) => {
  let history = useHistory();

  const [quote, setQuote] = useState({
    content: "",
    author: "",
  });
  const [newTags, setNewTags] = useState([]);
  const [existingTags, setExistingTags] = useState([]);
  const [invalidQuoteAuthor, setInvalidQuoteAuthor] = useState(false);
  const [invalidTag, setInvalidTag] = useState(false);

  useEffect(() => {
    setExistingTags(props.tags);
    props.setId(null);
  }, [props]);

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

  const handleSelectChange = (event) => {
    setTimeout(() => {
      const newTag = {
        name: event.value,
      };
      setNewTags([...newTags, newTag]);
      updateTagOptions(newTag);
    }, 200);
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
      saveQuote(postData).then(_quote => props.setQuotes([...props.quotes, _quote]))
      history.push("/");
    } else {
      setInvalidQuoteAuthor(true);
    }
    setQuote({ content: "", author: "" });
  };

  return (
    <>
      <br />
      {invalidQuoteAuthor && (
        <Alert
          className="emptyAlerts"
          variant="warning"
          onClose={() => setInvalidQuoteAuthor(false)}
          dismissible
        >
          Quote and Author fields cannot be empty. If author is unknown, enter
          'Anonymous'.
        </Alert>
      )}
      {invalidTag && (
        <Alert
          className="emptyAlerts"
          variant="warning"
          onClose={() => setInvalidTag(false)}
          dismissible
        >
          If adding new tag, field cannot be empty.
        </Alert>
      )}
      <div className="add-container">
        <div className="form-container">
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.TextArea
                width={14}
                label="Quote"
                placeholder="Add another great quote to the list..."
                name="content"
                value={quote.content}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Input
                width={8}
                label="Author"
                placeholder="Enter quote's author..."
                name="author"
                value={quote.author}
                onChange={handleChange}
              />
            </Form.Group>
            <Select
              placeholder="Select tag(s)"
              onChange={handleSelectChange}
              options={existingTags.map((t) => ({
                key: t.id,
                label: t.name,
                value: t.name,
              }))}
            />
            <br />
            <Form.Button>Submit Quote</Form.Button>
          </Form>
          <br />
          <Form onSubmit={handleTagSubmit}>
            <Form.Input
              placeholder="Add new tag..."
              name="addedTag"
              onChange={handleChange}
            />
            &nbsp; &nbsp;
            <Form.Button>+</Form.Button>
          </Form>
        </div>
        <div style={{ flex: 1 }}></div>
        <div className="tagsList">
          <h4>Added Tags</h4>
          <ul>
            {newTags.map((tag) => (
              <li key={tag.name}>{tag.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default AddQuote;
