import React from "react";
import { Link } from "react-router-dom";

const TagCard = ({ tag }) => <Link to={`/tag/${tag.id}`}>{tag.name}</Link>;

export default TagCard;
