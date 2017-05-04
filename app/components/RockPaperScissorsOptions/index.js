import React from "react"
import RockPaperScissorsOption from "components/RockPaperScissorsOption"
import RockPaperScissorsImage from "components/RockPaperScissorsImage"
import Wrapper from "./Wrapper"

export default class RockPaperScissorsOptions extends React.Component {
    render() {
        let { choice, onClick } = this.props
        return (
            <Wrapper>
                <RockPaperScissorsOption onClick={(e) => onClick("rock")}>
                    <h1>Rock</h1>
                    <RockPaperScissorsImage type={"rock"} />
                </RockPaperScissorsOption>

                <RockPaperScissorsOption onClick={(e) => onClick("paper")}>
                    <h1>Paper</h1>
                    <RockPaperScissorsImage type={"paper"} />
                </RockPaperScissorsOption>
                
                <RockPaperScissorsOption onClick={(e) => onClick("scissors")}>
                    <h1>Scissors</h1>
                    <RockPaperScissorsImage type={"scissors"} />
                </RockPaperScissorsOption>
            </Wrapper>
        )
    }
}