import React, { useState } from "react";
import { Form } from "semantic-ui-react";
import Alert from "react-bootstrap/Alert";
import Select from "react-select";
import "../App.css";

const AddQuote = (props) => {
  const [newTags, setNewTags] = useState([]);
  const [existingTags, setExistingTags] = useState(props.tags);
  const [invalidQuoteAuthor, setInvalidQuoteAuthor] = useState(false);
  const [invalidTag, setInvalidTag] = useState(false);

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

  const handleChange = (event) => {
    // setState({
    //     [event.target.name]: event.target.value
    // })
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
    let value = event.target.addedTag.value;
    event.target.addedTag.value = "";
    if (isValid(value)) {
      setTimeout(() => {
        const newTag = {
          name: value,
        };
        setNewTags([...newTags, newTag]);
        updateTagOptions(newTag);
      }, 200);
    } else {
      setInvalidTag(true)
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let content = event.target.quote.value;
    let author = event.target.author.value;
    event.target.quote.value = "";
    event.target.author.value = "";
    if (isValid(content) && isValid(author)) {
      const postData = {
        theQuote: {
          content: content,
          author: author,
        },
        theTags: newTags,
      };
      await fetch("/api/quotes", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
      props.handleViewChange("home");
    } else {
      setInvalidQuoteAuthor(true);
    }
  };
  {
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
        <div className="form-container">
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.TextArea
                width={16}
                label="Quote"
                placeholder="Add another great quote to the list..."
                name="quote"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Input
                width={16}
                label="Author"
                placeholder="Enter quote's author..."
                name="author"
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
          <Form id="tagForm" onSubmit={handleTagSubmit}>
            <Form.Input
              placeholder="Add new tag..."
              name="addedTag"
              onChange={handleChange}
            />
            &nbsp; &nbsp;
            <Form.Button>+</Form.Button>
          </Form>
        </div>
        <div className="tagsList">
          <h3>Added Tags</h3>
          <ul>
            {newTags.map((tag) => (
              <li key={tag.name}>{tag.name}</li>
            ))}
          </ul>
        </div>
      </>
    );
  }
};

export default AddQuote;
