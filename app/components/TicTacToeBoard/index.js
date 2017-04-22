import React from "react"
import styled from "styled-components"
import board from "./board.png"
import Tile from "components/TicTacToeTile"

let Board = styled.div`
    background-image: url(${board});
    background-size: cover;
    display: inline-block;
`
let Row = styled.div`
    display: block;
`
export default (props) => {
    return (
        <Board>
            <Row>
                <Tile></Tile>
                <Tile></Tile>
                <Tile></Tile>
            </Row>
            <Row>
                <Tile></Tile>
                <Tile></Tile>
                <Tile></Tile>
            </Row>
            <Row>
                <Tile></Tile>
                <Tile></Tile>
                <Tile></Tile>
            </Row>
        </Board>
    )
}