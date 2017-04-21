import React from "react"
import { Route } from "react-router-dom"

import HomePage from "containers/HomePage"
import Wrapper from "./Wrapper"
import chalkboard from "./chalkboard.jpg"

export default class App extends React.Component {
    render() {
        return (
            <Wrapper bg={chalkboard}>
                <Route path="/" component={HomePage} />
            </Wrapper>
        )
    }
}