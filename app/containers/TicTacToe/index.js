import React from "react"
import TicTacToeBoard from "components/TicTacToeBoard"
import Tile from "components/TicTacToeTile"
import Wrapper from "./Wrapper"
import Row from "./Row"

export default class TicTacToe extends React.Component {

    render() {
        return (
            <Wrapper>
                <TicTacToeBoard>
                    <Row>
                        <Tile data-tile="0" />
                        <Tile data-tile="1" />
                        <Tile data-tile="2" />
                    </Row>
                    <Row>
                        <Tile data-tile="3" />
                        <Tile data-tile="4" />
                        <Tile data-tile="5" />
                    </Row>
                    <Row>
                        <Tile data-tile="6" />
                        <Tile data-tile="7" />
                        <Tile data-tile="8" />
                    </Row>
                </TicTacToeBoard>
            </Wrapper>
        )
    }
}