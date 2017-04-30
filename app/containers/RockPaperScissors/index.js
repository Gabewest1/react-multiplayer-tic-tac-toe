import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { push } from "react-router-redux"

import Wrapper from "./Wrapper"
import CenteredWrapper from "./CenteredWrapper"
import RockPaperScissorsImage from "./RockPaperScissorsImage"
import * as actions from "./actions"

class RockPaperScissors extends React.Component {
    handleClick(e) {
        let choice = e.target.textContent
        this.props.rockPaperScissors(choice)
        console.log(this.props)
    }
    renderRockPaperScissorsGame() {
        let rockPaperScissors = ["Rock", "Paper", "Scissors"]
        return rockPaperScissors.map((choice, i) => (
            <CenteredWrapper key={i} onClick={(e) => this.handleClick(e)}>
                <h1>{choice}</h1>
                <RockPaperScissorsImage type={choice} />
            </CenteredWrapper>)
        )

    }
    renderRockPaperScissorsResult() {
        let props = this.props
        if(props.won) {
            setTimeout(() => props.push("/ticTacToe"), 2000)
            props.handleWin()
            return (
                <p>Winner is {props.winner}</p>
            )
        } else if(props.draw) {
            setTimeout(() => props.resetRockPaperScissors(), 1500)
            return (
                <p>Draw!!! Try Again!</p>
            )
        } else {
            setTimeout(() => props.push("/ticTacToe"), 2000)            
            props.handleLoss()
            return (
                <p>Winner is {props.winner}</p>
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