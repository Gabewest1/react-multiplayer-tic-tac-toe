import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"

import TicTacToeBoard from "components/TicTacToeBoard"
import Tile from "components/TicTacToeTile" 
import Wrapper from "./Wrapper"
import Row from "./Row"

import { setTile } from "./actions"

class TicTacToe extends React.Component {
    componentWillMount() {
        console.log(this.props)
    }
    handleClick(e) {
        let props = this.props
        let tile = e.target.getAttribute("data-tile")
        // props.setTile(tile, props.team)
        props.setTile(tile, "x")
    }

    createTiles() {
        let counter = 0
        let rows = this.props.board.map((row, i) => {
            return (
                <Row key={i}>
                    {this.props.board[i].map(tile => {
                        return (
                            <Tile onClick={(e) => this.handleClick(e)} data-tile={counter} key={counter++} />
                        )
                     })
                    }
                </Row>
            )
        })

        return rows
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

function mapStateToProps(state) {
    return {
        ...state.TicTacToe
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setTile
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TicTacToe)