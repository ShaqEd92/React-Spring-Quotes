import React from "react";
import { Link } from "react-router-dom";

const QuoteCard = ({ quote }) => (
  <Link to={`/quote/${quote.id}`}>
    <div key={quote.id} className="quote-card">
      <p className="quote-content">{quote.content}</p>
      <Link to={`/author/${quote.author}`}>
        <p className="quote-author">{quote.author}</p>
      </Link>
    </div>
  </Link>
);

export default QuoteCard;
