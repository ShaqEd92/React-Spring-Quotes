import React, { useState, useEffect } from "react";
import { Button, Form, Divider, Grid, Segment } from "semantic-ui-react";
import Select from "react-select";
import Alert from "react-bootstrap/Alert";
import "../App.css";

const EditQuote = (props) => {
  const [updatedQuote, setUpdatedQuote] = useState({
    content: props.singleQuote.content,
    author: props.singleQuote.author,
  });
  const [updatedTags, setUpdatedTags] = useState(props.singleQuote.tags);
  const [removedTag, setRemovedTag] = useState([]);
  const [tagOptions, setTagOptions] = useState(props.tags);
  const [invalidQuoteAuthor, setInvalidQuoteAuthor] = useState(false);
  const [invalidTag, setInvalidTag] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      props.singleQuote.tags.map((tag) => updateTagOptions(tag));
    }, 500);
  });

  const isValid = (str) => {
    const trimmedStr = str.trim();
    if (trimmedStr.length > 0) {
      return true;
    } else return false;
  };

  const updateTagOptions = (tag) => {
    const remainingOptions = tagOptions.filter((t) => t.name !== tag.name);
    setTagOptions(remainingOptions);
  };

  const handleChange = ({ target }) => {
    setUpdatedQuote({ ...updatedQuote, [target.name]: target.value });
  };

  const handleSelectChange = (event) => {
    setTimeout(() => {
      const newTag = {
        name: event.value,
      };
      setUpdatedTags(...updatedTags, newTag);
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
        setUpdatedTags([...updatedTags, newTag]);
        updateTagOptions(newTag);
      }, 200);
    } else {
      setInvalidTag(true);
    }
  };

  const handleRemoveTag = (tag) => {
    const remainingTags = updatedTags.filter((t) => t.name !== tag.name);
    const updatedOptions = [...tagOptions, tag];
    setUpdatedTags(remainingTags);
    setTagOptions(updatedOptions);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isValid(updatedQuote.content) && isValid(updatedQuote.author)) {
      const putData = {
        theQuote: updatedQuote,
        theTags: updatedTags,
      };
      await fetch(`/api/quotes/${props.singleQuote.id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(putData),
      });
      props.handleViewChange("home");
      setTimeout(() => {
        props.handleClick(props.singleQuote.id);
      }, 500);
      props.handleHomeView("oneQuote");
    } else {
      setInvalidQuoteAuthor(true);
    }
  };

  return (
    <>
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
      <Segment style={{ background: "transparent" }}>
        <Grid columns={2} relaxed="very">
          <Grid.Column>
            <Form onSubmit={handleSubmit}>
              <h2>Quote</h2>
              <Form.Group>
                <Form.TextArea
                  width={16}
                  name="content"
                  value={updatedQuote.content}
                  onChange={handleChange}
                />
              </Form.Group>
              <h2>Author</h2>
              <Form.Group>
                <Form.Input
                  width={16}
                  name="author"
                  value={updatedQuote.author}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Button>Update Quote</Form.Button>
            </Form>
          </Grid.Column>

          <Grid.Column>
            <h2>Tags</h2>
            {updatedTags.map((t) => (
              <>
                <Button.Group style={{ marginBottom: "2%" }}>
                  <Button content={t.name} />
                  <Button
                    onClick={() => handleRemoveTag(t)}
                    labelPosition="right"
                    icon="delete"
                  />
                </Button.Group>
                &nbsp; &nbsp;
              </>
            ))}
            <Select
              placeholder="Select tag(s)"
              onChange={handleSelectChange}
              options={tagOptions.map((t) => ({
                key: t.id,
                label: t.name,
                value: t.name,
              }))}
            />
            <br />
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
          </Grid.Column>
        </Grid>
        <Divider vertical>And</Divider>
      </Segment>
    </>
  );
};

export default EditQuote;
