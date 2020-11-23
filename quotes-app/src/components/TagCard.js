import React from "react";
import { Link } from "react-router-dom";

const TagCard = ({ tag }) => (
  <Link to={`/tag/${tag.id}`}>
    <p className="tag-card">{tag.name}</p>
  </Link>
);

export default TagCard;
