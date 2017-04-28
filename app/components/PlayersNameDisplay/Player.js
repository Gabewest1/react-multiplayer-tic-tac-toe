import React from "react"
import styled from "styled-components"

let Player = styled.div`
    color: ${(props) => props.player.isPlayersTurn && "yellow"};
`

export default (props) => {
    let { name } = props.player
    return (
        <Player>
            {name}
        </Player>
    )
}