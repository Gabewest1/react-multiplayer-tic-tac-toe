import React from "react"
import TicTacToeBoard from "components/TicTacToeBoard"
import Tile from "components/TicTacToeTile" 
import Wrapper from "./Wrapper"
import Row from "./Row"

import { setTile } from "./actions"

export default class TicTacToe extends React.Component {
    handleClick(e) {
        console.log(e.target.getAttribute("data-tile"))
    }

    createTiles() {
        let tiles = []
        for(var i=0; i<9; i+=3) {
            tiles.push((
                <Row key={i}>
                    <Tile onClick={this.handleClick} data-tile={i} key={i} />
                    <Tile onClick={this.handleClick} data-tile={i+1} key={i+1} />
                    <Tile onClick={this.handleClick} data-tile={i+2} key={i+2} />
                </Row>
            ))
        }
        return tiles
    }

    render() {
        return (
            <Wrapper>
                <TicTacToeBoard>
                    {this.createTiles()}
                </TicTacToeBoard>
            </Wrapper>
        )
    }
}