import React from "react"
import styled from "styled-components"

import Rock from "assets/images/rock.png"
import Paper from "assets/images/paper.png"
import Scissors from "assets/images/scissors.png"

let RockPaperScissorsImage = styled.img`
    max-width: 100%;
    max-height: 100%;
`

export default (props) => {
    let choices = {
        "rock": Rock,
        "paper": Paper,
        "scissors": Scissors
    }
    let {type} = props
    let imgSrc = choices[type.toLowerCase()]
    return (
        <RockPaperScissorsImage src={imgSrc} alt={type} />
    )
}