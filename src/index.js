import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import "./index.css";


import { store } from "./store";
import { App } from "Components/App";

import reportWebVitals from "./reportWebVitals";


ReactDOM.render(
  <React.StrictMode>

    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>

  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
