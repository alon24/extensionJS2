import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Content from "./Content.jsx";

const root = document.createElement("div");
root.id = "crx-root";
document.body.append(root);

ReactDOM.render(
  <React.StrictMode>
    <Content />
  </React.StrictMode>,
  root
);
