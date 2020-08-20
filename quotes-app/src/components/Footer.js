import React from "react";
import "../styles/App.css";

const Footer = () => {
  const footer = {
    position: "absolute",
    bottom: 0,
    left: 0,
    height: "3vh",
    width: "100vw",
    backgroundColor: "black",
    color: "white",
    fontSize: "1.35rem",
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
        style={{ color: "#8e8dbe", fontSize: "1.35rem" }}
      >
        Shaquille Edwards
      </a>
    </div>
  );
};

export default Footer;
