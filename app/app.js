import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import multi from "redux-multi"
import thunk from "redux-thunk"

import socket from "./socket"
import createSocketIoMiddleware from "redux-socket.io"
let socketIoMiddleware = createSocketIoMiddleware(socket, "server/")

import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'

import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import { composeWithDevTools } from "redux-devtools-extension"

import reducers from './reducers'

import App from "containers/App"
import "normalize.css"

const history = createHistory()

const routeMiddleware = routerMiddleware(history)

const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer,
  }),
  composeWithDevTools(applyMiddleware(thunk, routeMiddleware, socketIoMiddleware))
)

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>
, document.getElementById("app"))