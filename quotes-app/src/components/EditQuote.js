import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Button, Form } from "semantic-ui-react";
import Select from "react-select";
import Alert from "react-bootstrap/Alert";
import { getQuote, editQuote } from "../api/quotesApi";
import { getOtherTags } from "../api/tagsApi";
import "../App.css";

const EditQuote = (props) => {
  let id = useParams().slug;
  let history = useHistory();

  const [updatedQuote, setUpdatedQuote] = useState({
    content: "",
    author: "",
    tags: [],
  });
  const [tagOptions, setTagOptions] = useState([]);
  const [invalidQuoteAuthor, setInvalidQuoteAuthor] = useState(false);
  const [invalidTag, setInvalidTag] = useState(false);

  useEffect(() => {
    getOtherTags(id).then((_tags) => setTagOptions(_tags));
    getQuote(id).then((_quote) =>
      setUpdatedQuote({
        content: _quote.content,
        author: _quote.author,
        tags: _quote.tags,
      })
    );
    props.setId(id);
  }, [id]);

  const isValid = (str) => {
    const trimmedStr = str.trim();
    if (trimmedStr.length > 0) {
      return true;
    } else return false;
  };

  const updateTagOptions = (tag) => {
    const remainingOptions = tagOptions.filter((_tag) => _tag.name !== tag);
    setTagOptions(remainingOptions);
  };

  const handleChange = ({ target }) => {
    setUpdatedQuote({ ...updatedQuote, [target.name]: target.value });
  };

  const handleSelectChange = (event) => {
    const newTag = {
      name: event.value,
    };
    setUpdatedQuote({
      ...updatedQuote,
      tags: [...updatedQuote.tags, newTag],
    });
    updateTagOptions(event.value);
  };

  const handleTagSubmit = (event) => {
    event.preventDefault();
    let value = event.target.addedTag.value;
    event.target.addedTag.value = "";
    if (isValid(value)) {
      const newTag = {
        name: value,
      };
      setUpdatedQuote({
        ...updatedQuote,
        tags: [...updatedQuote.tags, newTag],
      });
      updateTagOptions(newTag);
    } else {
      setInvalidTag(true);
    }
  };

  const handleRemoveTag = (tag) => {
    const remainingTags = updatedQuote.tags.filter((t) => t.name !== tag.name);
    const updatedOptions = [...tagOptions, tag];
    setUpdatedQuote({ ...updatedQuote, tags: remainingTags });
    setTagOptions(updatedOptions);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isValid(updatedQuote.content) && isValid(updatedQuote.author)) {
      const putData = {
        theQuote: updatedQuote,
        theTags: updatedQuote.tags,
      };
      editQuote(putData, id);
      history.push("/quote/" + id);
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
          content="Quote and Author fields cannot be empty. If author is unknown, enter
          'Anonymous'."
        />
      )}
      {invalidTag && (
        <Alert
          className="emptyAlerts"
          variant="warning"
          onClose={() => setInvalidTag(false)}
          dismissible
          content="If adding new tag, field cannot be empty."
        />
      )}
      <div className="edit-container">
        <div className="edit-box">
          <Form onSubmit={handleSubmit}>
            <h4>Quote</h4>
            <Form.Group>
              <Form.TextArea
                width={12}
                name="content"
                value={updatedQuote.content}
                onChange={handleChange}
              />
            </Form.Group>
            <h4>Author</h4>
            <Form.Group>
              <Form.Input
                width={8}
                name="author"
                value={updatedQuote.author}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Button>Update Quote</Form.Button>
          </Form>
        </div>
        <div className="edit-box">
          <h4>Tags</h4>
          {updatedQuote.tags.map((t) => (
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
            options={tagOptions.map((tag) => ({
              key: tag.id,
              label: tag.name,
              value: tag.name,
            }))}
          />
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
      </div>
    </>
  );
};

export default EditQuote;
