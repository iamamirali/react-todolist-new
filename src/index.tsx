import ReactDOM from "react-dom/client";
import "./index.scss";
import "./polyfill";
import App from "./App/App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);
