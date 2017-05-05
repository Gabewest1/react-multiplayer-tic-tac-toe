import React from "react"
import styled from "styled-components"

import Rock from "assets/images/rock.png"
import Paper from "assets/images/paper.png"
import Scissors from "assets/images/scissors.png"
import QuestionMark from "assets/images/questionMark.png"

let RockPaperScissorsImage = styled.img`
    max-width: 100%;
    max-height: 180px;
    height: auto;
`

export default (props) => {
    let choices = {
        "rock": Rock,
        "paper": Paper,
        "scissors": Scissors,
        "none": QuestionMark
    }
    let type = props.type ? props.type.toLowerCase() : "none"
    let imgSrc = choices[type]

    return (
        <RockPaperScissorsImage src={imgSrc} alt={type} />
    )
}