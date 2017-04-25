import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import socket from "socket"

import Wrapper from "./Wrapper"
import { setPlayer, test } from "./actions"

class RockPaperScissors extends React.Component {
    handleClick(e) {
        let choice = e.target.textContent
        socket.emit()
        // this.props.setPlayer("player1", "x")
        // this.props.setPlayer("player2", "o")
        console.log(this.props)
        this.props.test("Hello World")
    }
    render() {
        return (
            <Wrapper>
                <div onClick={(e) => this.handleClick(e)}>Rock</div>
                <div onClick={(e) => this.handleClick(e)}>Paper</div>
                <div onClick={(e) => this.handleClick(e)}>Scissors</div>
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
        setPlayer,
        test
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RockPaperScissors)