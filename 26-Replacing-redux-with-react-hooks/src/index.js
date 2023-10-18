import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from 'react-dom/client';

import "./index.css";
import App from "./App";
//import productReducer from "./store/reducers/products";
//import ProductsProvider from "./context/products-context";
import configureStore from "./hooks-store/products-store";

configureStore();

const root = createRoot(document.getElementById("root"));
root.render(
  // <ProductsProvider>

    <BrowserRouter>
      <App />
    </BrowserRouter>

  // {/* </ProductsProvider> */}
);
