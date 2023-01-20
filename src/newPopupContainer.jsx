import React from "react";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
const root = createRoot(container);
const Ilan = () => {
  return <h1>New Popup standalone111</h1>;
};

root.render(<Ilan />);
