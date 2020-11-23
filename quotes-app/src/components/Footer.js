import React from "react";

const Footer = () => {
  const footer = {
    position: "absolute",
    bottom: 0,
    left: 0,
    height: "5vh",
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
        href="https://www.ShaqEdwards.com"
        target="blank"
        style={{ color: "#8e8dbe", fontSize: "1.35rem" }}
      >
        Shaquille Edwards
      </a>
    </div>
  );
};

export default Footer;
