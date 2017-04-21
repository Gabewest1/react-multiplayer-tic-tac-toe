import React from "react"
import { render } from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import App from "containers/App/"
import "normalize.css"

render(
    <Router>
        <App />
    </Router>
, document.getElementById("app"))