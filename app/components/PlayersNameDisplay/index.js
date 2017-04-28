import React from "react"
import Wrapper from "./Wrapper"
import Player from "./Player"

export default (props) => {
    let players = props.players.map((player, i) => <Player key={i} player={player} />)
    return (
        <Wrapper>
            {players}
        </Wrapper>
    )
}