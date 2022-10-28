import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer, {rootSaga} from './modules';
import {logger} from "redux-logger/src";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga"

const sagaMiddleWare = createSagaMiddleware();
const store = createStore(
    rootReducer,
    composeWithDevTools( applyMiddleware(logger, thunk, sagaMiddleWare ) )
);
sagaMiddleWare.run(rootSaga)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
