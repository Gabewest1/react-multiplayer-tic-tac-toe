import React from "react"
import styled from "styled-components"

import Rock from "assets/images/rock.png"
import RockSelected from "assets/images/rock--selected.png"
import Paper from "assets/images/paper.png"
import PaperSelected from "assets/images/paper--selected.png"
import Scissors from "assets/images/scissors.png"
import ScissorsSelected from "assets/images/scissors--selected.png"
import QuestionMark from "assets/images/questionMark.png"

let RockPaperScissorsImage = styled.img`
    max-width: 100%;
    max-height: 180px;
    height: auto;
`

export default (props) => {
    let isImageSelected = props.selected

    let choices = {
        "rock": Rock,
        "paper": Paper,
        "scissors": Scissors,
        "none": QuestionMark
    }

    let selectedChoices = {
        "rock": RockSelected,
        "paper": PaperSelected,
        "scissors": ScissorsSelected,
    }

    let type = props.type ? props.type.toLowerCase() : "none"
    let imgSrc = isImageSelected 
                    ? selectedChoices[type] 
                    : choices[type]

    return (
        <RockPaperScissorsImage src={imgSrc} alt={type} />
    )
}