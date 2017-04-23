import React from "react"
import styled from "styled-components"
import Tile from "./Tile"

export default class TicTacToeTile extends React.Component {
    constructor() {
        super()
        this.state = {
            isSet: false,
            X: false,
            O: false
        }

    }

    render() {
        return (
            <Tile 
                X={this.state.X}
                O={this.state.O}
                data-tile={this.props["data-tile"]} 
                onClick={this.props.onClick}
            />
        )
    }
}