import React from "react"
import TicTacToeBoard from "components/TicTacToeBoard"
import Tile from "components/TicTacToeTile" 
import Wrapper from "./Wrapper"
import Row from "./Row"

export default class TicTacToe extends React.Component {
    handleClick(e) {
        console.log(`${e.target.getAttribute("data-tile")} said that tickled c:`)
        console.log(typeof e.target.getAttribute("data-tile"))
    }

    render() {
        return (
            <Wrapper>
                <TicTacToeBoard>
                    <Row>
                        <Tile onClick={this.handleClick} data-tile="0" />
                        <Tile onClick={this.handleClick} data-tile="1" />
                        <Tile onClick={this.handleClick} data-tile="2" />
                    </Row>
                    <Row>
                        <Tile onClick={this.handleClick} data-tile="3" />
                        <Tile onClick={this.handleClick} data-tile="4" />
                        <Tile onClick={this.handleClick} data-tile="5" />
                    </Row>
                    <Row>
                        <Tile onClick={this.handleClick} data-tile="6" />
                        <Tile onClick={this.handleClick} data-tile="7" />
                        <Tile onClick={this.handleClick} data-tile="8" />
                    </Row>
                </TicTacToeBoard>
            </Wrapper>
        )
    }
}