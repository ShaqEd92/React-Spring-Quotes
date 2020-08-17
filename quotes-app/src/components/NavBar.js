import React from "react";
import { NavLink, useParams } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import "../App.css";
import "../styles/NavBar.css";

const NavBar = () => {
  let view = useParams().slug;
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
        {(view !== "quotes" || view !== "tags") && (
          <>
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
          </>
        )}
      </Menu>
    </>
  );
};

export default NavBar;
