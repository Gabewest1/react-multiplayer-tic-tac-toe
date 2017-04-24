import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'

import createSocketIoMiddleware from "redux-socket.io"
import io from "socket.io-client"
let socket = io("http://localhost:8000")
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
  composeWithDevTools(applyMiddleware(routeMiddleware, socketIoMiddleware))
)

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>
, document.getElementById("app"))