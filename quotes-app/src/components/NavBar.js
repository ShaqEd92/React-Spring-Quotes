import React from "react";
import { NavLink } from "react-router-dom";
import AddIcon from "./images/AddIcon";

const NavBar = () => (
  <div className="nav-bar">
    <div>
      <NavLink to="/">
        <h1>The Quotes-Repo</h1>
      </NavLink>
      <NavLink to="/add-quote">
        <AddIcon />
      </NavLink>
    </div>
  </div>
);

export default NavBar;
