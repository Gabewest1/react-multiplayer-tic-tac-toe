import React from "react"
import styled from "styled-components"
import Tile from "./Tile"

export default class TicTacToeTile extends React.Component {
    render() {
        return (
            <Tile 
                team={this.props.team}
                data-tile={this.props["data-tile"]} 
                onClick={this.props.onClick}
            />
        )
    }
}