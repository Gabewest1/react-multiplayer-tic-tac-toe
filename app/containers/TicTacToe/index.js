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
                </TicTacToeBoard>
            </Wrapper>
        )
    }
}