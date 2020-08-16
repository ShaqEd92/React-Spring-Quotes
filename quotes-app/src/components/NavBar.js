import React from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import "../App.css";

const NavBar = () => {
  return (
    <>
      <Menu attached="top" tabular>
        <NavLink
          to="/"
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
        <NavLink
          to="/edit-quote"
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
      </Menu>
    </>
  );
};

export default NavBar;
