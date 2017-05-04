import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { push } from "react-router-redux"

import Wrapper from "./Wrapper"
import RockPaperScissorsOptions from "components/RockPaperScissorsOptions"
import RockPaperScissorsImage from "components/RockPaperScissorsImage"

import * as actions from "./actions"

import styled from "styled-components"
const Hidden = styled.div`
    display: ;
`
class RockPaperScissors extends React.Component {
    handleClick(choice) {
        this.props.rockPaperScissors(choice)
    }
    renderRockPaperScissorsGame() {
        let arr = [1,2]
        return (
            <Wrapper>
                <RockPaperScissorsOptions onClick={this.handleClick.bind(this)}/>
                <Hidden>
                    <RockPaperScissorsImage type={this.props.usersSelection}/>
                </Hidden>
                <Hidden>
                    <RockPaperScissorsImage type={this.props.opponentsSelection}/>
                </Hidden>
                <RockPaperScissorsOptions onClick={this.handleClick.bind(this)}/>
            </Wrapper>
        )
        return arr.map((val, i) => <RockPaperScissorsOptions key={i} onClick={this.handleClick.bind(this)}/>)        
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
        ...state.rockPaperScissors,
        ...state.matchMaking
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        push,
        ...actions
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RockPaperScissors)