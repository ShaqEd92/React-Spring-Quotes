import React from "react";

const QuoteForm = ({
  quote,
  existingTags,
  newTags,
  onSubmit,
  onChange,
  onSelect,
  onTagSubmit,
}) => (
  <div>
    <form onSubmit={onSubmit}>
      <h5>Quote</h5>
      <textarea
        placeholder="Add another great quote to the list..."
        name="content"
        value={quote.content}
        onChange={onChange}
      ></textarea>
      <h5>Author</h5>
      <input
        type="text"
        placeholder="Enter quote's author..."
        name="author"
        value={quote.author}
        onChange={onChange}
      />
      <select onChange={onSelect}>
        {existingTags.map((tag) => (
          <option key={tag.id} value={tag.name}>
            {tag.name}
          </option>
        ))}
      </select>
      <button type="submit">Submit Quote</button>
    </form>

    <form onSubmit={onTagSubmit}>
      <input placeholder="Add new tag..." name="addedTag" onChange={onChange} />
      &nbsp; &nbsp;
      <button type="submit">+</button>
    </form>

    <div className="tagsList">
      <h5>Added Tags</h5>
      <ul>
        {newTags.map((tag) => (
          <li key={tag.name}>{tag.name}</li>
        ))}
      </ul>
    </div>
  </div>
);

export default QuoteForm;
