import React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import Wrapper from "./Wrapper"
import AnimatedSearchText from "components/MatchmakingSearchText"

class MatchMakingPage extends React.Component {
    searchingForOpponent() {
        return (
            <AnimatedSearchText>Searching for opponent...</AnimatedSearchText>
        )
    }
    foundOpponent() {
        return (
            <div>Found Opponent!</div>
        )
    }
    render() {
        return (
            <Wrapper>
                {this.props.foundOpponent ? this.foundOpponent() : this.searchingForOpponent()}
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
        
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MatchMakingPage)