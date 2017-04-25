import React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import Wrapper from "./Wrapper"
import AnimatedSearchText from "components/MatchmakingSearchText"
import * as actions from "./actions"

class MatchMakingPage extends React.Component {
    handleOppenentJoined() {
        this.props.opponentJoined()
    }
    handleOpponentLeft() {
        this.props.opponentLeft()
    }
    renderSearchingForOpponent() {
        return (
            <AnimatedSearchText>Searching for opponent...</AnimatedSearchText>
        )
    }
    renderFoundOpponent() {
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
    return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MatchMakingPage)