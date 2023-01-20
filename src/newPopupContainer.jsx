import React from "react";
import { createRoot } from "react-dom/client";
import { ApplicationPage } from "./applicationpage.jsx";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(<ApplicationPage />);
