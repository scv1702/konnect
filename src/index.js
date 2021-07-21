import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import Header from "./Header";
import Body from "./Body";

import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <BrowserRouter>
    <Header />
    <Body />
  </BrowserRouter>,
  document.getElementById("root")
);
