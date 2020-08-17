import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { deleteQuote } from "../api/quotesApi";
import "../App.css";
import "../styles/NavBar.css";

const NavBar = (props) => {
  let history = useHistory();

  const handleClick = () => {
      deleteQuote(props.id).catch((err) => console.log(err));
      history.push("/");  
      window.location.reload();
  };

  return (
    <>
      <Menu attached="top" tabular>
        <NavLink
          to="/view"
          activeClassName="is-active"
          style={{ textDecoration: "none" }}
        >
          <Menu.Item icon="home large" />
        </NavLink>
        <NavLink
          to="/add-quote"
          activeClassName="is-active"
          style={{ textDecoration: "none" }}
        >
          <Menu.Item icon="plus large" />
        </NavLink>
        {props.id && (
          <>
            <NavLink
              to={`/edit-quote/${props.id}`}
              activeClassName="is-active"
              style={{ textDecoration: "none" }}
            >
              <Menu.Item
                icon="edit large"
                activeClassName="is-active"
                style={{ cursor: "pointer" }}
              />
            </NavLink>
            <Menu.Item
              icon="trash large"
              style={{ cursor: "pointer" }}
              onClick={handleClick}
            />
          </>
        )}
      </Menu>
    </>
  );
};

export default NavBar;
