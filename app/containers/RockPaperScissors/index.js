import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"

import Wrapper from "./Wrapper"
import { setPlayer } from "./actions"

class RockPaperScissors extends React.Component {
    handleClick(e) {
        let choice = e.target.textContent
        this.props.setPlayer("player1", "x")
        this.props.setPlayer("player2", "o")
    }
    render() {
        return (
            <Wrapper>
                <div>Rock</div>
                <div>Paper</div>
                <div>Scissors</div>
            </Wrapper>
        )
    }
}

function mapStateToProps(state) {
    return {
        ...state.TicTacToe
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setPlayer
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RockPaperScissors)