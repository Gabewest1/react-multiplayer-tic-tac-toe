import React from "react"
import styled from "styled-components"

let Player = styled.div`
    color: ${(props) => props.isPlayersTurn ? "yellow" : ""};
`

export default (props) => {
    let { name, team, isPlayersTurn } = props.player
    if(name.length > 8) 
        name = name.substring(0, 9)
    
    return (
        <Player isPlayersTurn={isPlayersTurn}>
            {name}
        </Player>
    )
}