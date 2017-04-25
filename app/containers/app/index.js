import React from "react"
import { Route } from "react-router-dom"

import HomePage from "containers/HomePage"
import TicTacToe from "containers/TicTacToe"
import RockPaperScissors from "containers/RockPaperScissors"
import MatchMakingPage from "containers/MatchMakingPage"

import Wrapper from "./Wrapper"
import chalkboard from "./chalkboard.jpg"

export default class App extends React.Component {
    render() {
        return (
            <Wrapper bg={chalkboard}>
                <Route exact path="/" component={HomePage} />
                <Route path="/ticTacToe" component={TicTacToe} />
                <Route path="/rockPaperScissors" component={RockPaperScissors} />
                <Route path="/online" component={MatchMakingPage} />
            </Wrapper>
        )
    }
}