import React from "react"
import Wrapper from "./Wrapper"
import Player from "./Player"

export default (props) => {
    let { player1, player2 } = props.players
    return (
        <Wrapper>
            <Player player={player1} />
            <Player player={player2} />
        </Wrapper>
    )
}