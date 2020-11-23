import React from "react";

const QuoteForm = ({
  quote,
  tags,
  newTag,
  onSubmit,
  onChange,
  onTagChange,
  onSelect,
  onTagSubmit,
}) => (
  <div className="form-container">
    <div>
      <form onSubmit={onSubmit}>
        <h3>Quote</h3>
        <textarea
          placeholder="Add another great quote to the list..."
          rows="5"
          name="content"
          value={quote.content}
          onChange={onChange}
        ></textarea>
        <h3>Author</h3>
        <input
          placeholder="Enter quote's author..."
          name="author"
          value={quote.author}
          onChange={onChange}
        />
        <h3>Tags</h3>
        <select onChange={onSelect}>
          {tags.map((tag) => (
            <option value={tag.name}>{tag.name}</option>
          ))}
        </select>
        <button id="submitQuote" type="submit">
          SAVE QUOTE
        </button>
      </form>

      <form id="addTag" onSubmit={onTagSubmit}>
        <input
          placeholder="Add new tag..."
          onChange={onTagChange}
          value={newTag.name}
        />
        <button type="submit">+</button>
      </form>
    </div>

    <div>
      <h3>Added Tags</h3>
      <ul>
        {quote.tags.map((tag) => (
          <li>{tag.name}</li>
        ))}
      </ul>
    </div>
  </div>
);

export default QuoteForm;
