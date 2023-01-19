import React from "react";
import "./index.css";
import Popup from "./Popup.jsx";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(<Popup />);
