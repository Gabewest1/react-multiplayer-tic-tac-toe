import React from "react"
import TicTacToeBoard from "components/TicTacToeBoard"
import Wrapper from "./Wrapper"

export default class TicTacToe extends React.Component {
    render() {
        return (
            <Wrapper>
                <TicTacToeBoard />
            </Wrapper>
        )
    }
}