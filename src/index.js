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
import {tempSetUser, check} from "./modules/user";
import AxiosInterceptor from "./lib/AxiosInterceptor";

const sagaMiddleWare = createSagaMiddleware();
const store = createStore(
    rootReducer,
    composeWithDevTools( applyMiddleware(logger, thunk, sagaMiddleWare ) )
);

//페이지 새로고침 시, 로그인 상태를 유지하기 위해
function loadUser() {
    try {
        const user = localStorage.getItem('user');
        if (!user) return;
        store.dispatch(tempSetUser(user));
        store.dispatch(check());
    } catch (e) {
        console.log('localStorage is not working');
    }
}

sagaMiddleWare.run(rootSaga)
loadUser();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <BrowserRouter>
            {<AxiosInterceptor/>}
            <App />
        </BrowserRouter>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
