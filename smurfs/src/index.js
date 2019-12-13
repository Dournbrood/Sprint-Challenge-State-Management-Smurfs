import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";

//First, we get our reducer...
import reducer from "./reducers";

//Get all the linky stuff
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

// composeEnhancers black magic
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//Create our store.
const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(thunk, logger))
);

//Render!
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));