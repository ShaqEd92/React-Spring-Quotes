import React from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import "../App.css";
import "../styles/NavBar.css";

const NavBar = (props) => {
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
            <Menu.Item icon="trash large" style={{ cursor: "pointer" }} />
          </>
        )}
      </Menu>
    </>
  );
};

export default NavBar;
