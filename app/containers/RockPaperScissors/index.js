import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { push } from "react-router-redux"

import Wrapper from "./Wrapper"
import * as actions from "./actions"

class RockPaperScissors extends React.Component {
    handleClick(e) {
        let choice = e.target.textContent
        this.props.rockPaperScissors(choice)
        console.log(this.props)
    }
    renderRockPaperScissorsGame() {
        let rockPaperScissors = ["Rock", "Paper", "Scissors"]
        return rockPaperScissors.map((choice, i) => 
            <div key={i} onClick={(e) => this.handleClick(e)}>{choice}</div>)

    }
    renderRockPaperScissorsResult() {
        if(this.props.winner) {
            return handleWin.apply(this)
        } else if(this.props.draw) {
            return handleDraw.apply(this)
        }

        function handleWin() {
            setTimeout(() => this.props.push("/ticTacToe"), 2000)
            return (
                <p>Winner is {this.props.winner}</p>
            )
        }
        function handleDraw() {
            setTimeout(() => this.props.resetRockPaperScissors(), 1500)
            return (
                <p>Draw!!! Try Again!</p>
            )
        }
    }
    render() {
        return (
            <Wrapper>
                {this.props.results ? this.renderRockPaperScissorsResult() 
                                    : this.renderRockPaperScissorsGame()}
            </Wrapper>
        )
    }
}

function mapStateToProps(state) {
    return {
        ...state.rockPaperScissors
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        push,
        ...actions
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RockPaperScissors)