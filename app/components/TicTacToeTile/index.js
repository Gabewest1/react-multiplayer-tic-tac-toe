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
    handleClick(e) {
        console.log(`${e.target.getAttribute("data-tile")} said that tickled c:`)
        console.log(typeof e.target.getAttribute("data-tile"))
        this.setState({X: true})
    }
    render() {
        return (
            <Tile 
                X={this.state.X}
                O={this.state.O}
                data-tile={this.props["data-tile"]} 
                onClick={this.handleClick.bind(this)}
            />
        )
    }
}