import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ProjectsApp from "./ProjectsApp.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ProjectsApp />
  </StrictMode>
);
