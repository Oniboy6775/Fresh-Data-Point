import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { AppProvider } from "../src/context/UserContext";
import { ToastContainer } from "react-toastify";
import { Flowbite } from "flowbite-react";

const root = ReactDOM.createRoot(document.getElementById("root"));
const customTheme = {
  accordion: {
    title: {
      base: " flex w-full items-center justify-between p-2 text-left font-medium text-red-500 first:rounded-t-lg last:rounded-b-lg dark:text-gray-400",
    },
  },
};
root.render(
  <Router>
    <AppProvider>
      <ToastContainer />
      <Flowbite theme={{ theme: customTheme }}>
        <App />
      </Flowbite>
    </AppProvider>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
