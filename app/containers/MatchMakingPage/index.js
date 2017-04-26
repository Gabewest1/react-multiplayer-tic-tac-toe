import React from "react"
import { connect } from "react-redux"
import { push } from "react-router-redux"
import { bindActionCreators } from "redux"

import Wrapper from "./Wrapper"
import AnimatedSearchText from "components/MatchmakingSearchText"
import * as actions from "./actions"

import socket from "socket"

class MatchMakingPage extends React.Component {
    componentDidMount() {
        this.props.findOpponent()
    }
    renderSearchingForOpponent() {
        return (
            <AnimatedSearchText>Searching for opponent...</AnimatedSearchText>
        )
    }
    renderFoundOpponent() {
        setTimeout(() => this.props.push("/ticTacToe"), 3000)
        return (
            <div>Found Opponent!</div>
        )
    }
    render() {
        console.log(this.props)
        return (
            <Wrapper>
                {this.props.foundOpponent ? this.renderFoundOpponent() : this.renderSearchingForOpponent()}
            </Wrapper>
        )
    }
}

function mapStateToProps(state) {
    return {
        ...state.matchMaking
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        push,
        ...actions
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MatchMakingPage)