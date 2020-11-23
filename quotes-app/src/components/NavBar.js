import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { deleteQuote } from "../api/quotesApi";

const NavBar = ({ id }) => {
  let history = useHistory();

  const handleClick = () => {
    deleteQuote(id).catch((err) => console.log(err));
    history.push("/");
  };

  return (
    <div>
      <div>
        <NavLink
          to="/view"
          activeClassName="is-active"
          style={{ textDecoration: "none" }}
        >
          <p>Home Icon</p>
        </NavLink>
        <NavLink
          to="/add-quote"
          activeClassName="is-active"
          style={{ textDecoration: "none" }}
        >
          <p>Add Icon</p>
        </NavLink>
        {id && (
          <>
            <NavLink
              to={`/edit-quote/${id}`}
              activeClassName="is-active"
              style={{ textDecoration: "none" }}
            >
              <p>Edit Icon</p>
            </NavLink>
            <p>Delete Icon</p>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
