import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { Provider } from "react-redux";
import { store } from "./store";
import axios from "axios";
import { Toaster } from "react-hot-toast";

//Axios config
axios.defaults.baseURL = "http://localhost:4000/api";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />

    <Toaster toastOptions={{ position: "bottom-right" }} />
  </Provider>
);
