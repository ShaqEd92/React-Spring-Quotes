import React from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "semantic-ui-react";

const NavBar = () => {
  return (
    <>
      <Menu attached="top" tabular>
        <NavLink to="/" style={{ textDecoration: "none" }}>
          <Menu.Item icon="home large" />
        </NavLink>
        <NavLink to="/" style={{ textDecoration: "none" }}>
          <Menu.Item icon="plus large" />
        </NavLink>
        <NavLink to="/" style={{ textDecoration: "none" }}>
          <Menu.Item icon="edit large" />
        </NavLink>
        <NavLink to="/" style={{ textDecoration: "none" }}>
          <Menu.Item icon="trash large" />
        </NavLink>
      </Menu>
    </>
  );
};

export default NavBar;
