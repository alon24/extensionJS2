import React from "react";
import "./index.css";
import Content from "./Content.jsx";
import { createRoot } from "react-dom/client";

const container = document.createElement("div");
container.id = "crx-root";
document.body.append(container);

const root = createRoot(container);

root.render(<Content />);
