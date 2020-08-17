import React from "react";
import "../App.css";

const Footer = () => {
  const footer = {
    height: "2.5vw",
    width: "100vw",
    backgroundColor: "black",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div style={footer}>
      Created by&nbsp;
      <a
        href="https://ShaqEd92.github.io"
        target="blank"
        style={{ color: "#8e8dbe" }}
      >
        Shaquille Edwards
      </a>
    </div>
  );
};

export default Footer;
