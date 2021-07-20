import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";

import Header from "./Header";
import Body from "./Body";

import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <HashRouter>
    <Header />
    <Body />
  </HashRouter>,
  document.getElementById("root")
);
