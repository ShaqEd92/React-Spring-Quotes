import React from "react";
import { Link } from "react-router-dom";

const QuoteCard = ({ quote }) => (
  <div ui centered card key={quote.id} style={{ cursor: "pointer" }}>
    <Link to={`/quote/${quote.id}`} className="card-content">
      <div>{quote.content}</div>
    </Link>
    <Link to={`/author/${quote.author}`} className="card-content">
      <div>
        <span style={{ fontStyle: "italic" }}>{quote.author}</span>
      </div>
    </Link>
  </div>
);

export default QuoteCard;
