import React from "react"
import RockPaperScissorsOption from "../RockPaperScissorsOption"
import RockPaperScissorsImage from "../RockPaperScissorsImage"
import Wrapper from "./Wrapper"

export default class RockPaperScissorsOptions extends React.Component {
    render() {
        let { choice, onClick, selected } = this.props
        return (
            <Wrapper>
                <RockPaperScissorsOption onClick={(e) => onClick("rock")}>
                    <h1 style={{color: selected === "rock" ? "yellow" : "inherit"}}>Rock</h1>
                    <RockPaperScissorsImage type={"rock"}
                                            selected={selected === "rock"} />
                </RockPaperScissorsOption>

                <RockPaperScissorsOption onClick={(e) => onClick("paper")}>
                    <h1 style={{color: selected === "paper" ? "yellow" : "inherit"}}>Paper</h1>
                    <RockPaperScissorsImage type={"paper"}
                                            selected={selected === "paper"} />
                </RockPaperScissorsOption>
                
                <RockPaperScissorsOption onClick={(e) => onClick("scissors")}>
                    <h1 style={{color: selected === "scissors" ? "yellow" : "inherit"}}>Scissors</h1>
                    <RockPaperScissorsImage type={"scissors"}
                                            selected={selected === "scissors"} />
                </RockPaperScissorsOption>
            </Wrapper>
        )
    }
}