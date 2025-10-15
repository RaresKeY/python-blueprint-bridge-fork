import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { enable, disable, setFetchMethod } from "darkreader";

// optional but recommended for dynamic CSS fetching
setFetchMethod(window.fetch);

// enable dark mode by default
enable({
  brightness: 100,
  contrast: 100,
  sepia: 0,
});

// If you want to start in light mode instead, replace the above line with:
// disable();

createRoot(document.getElementById("root")!).render(<App />);
