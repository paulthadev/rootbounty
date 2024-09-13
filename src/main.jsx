import { Toaster } from "react-hot-toast";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store.js";

createRoot(document.getElementById("root")).render(
  <>
    <Provider store={store}>
      <App />
      <Toaster />
    </Provider>
  </>
);
