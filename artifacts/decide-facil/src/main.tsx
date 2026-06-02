import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const params = new URLSearchParams(window.location.search);
const redirect = params.get("redirect");

if (redirect) {
  window.history.replaceState(
    null,
    "",
    import.meta.env.BASE_URL.replace(/\/$/, "") + redirect
  );
}

createRoot(document.getElementById("root")!).render(<App />);
