import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"

import TicTacToeBoard from "components/TicTacToeBoard"
import Tile from "components/TicTacToeTile" 
import Wrapper from "./Wrapper"
import Row from "./Row"

import { setTile } from "./actions"

class TicTacToe extends React.Component {
    handleClick(e) {
        let tile = e.target.getAttribute("data-tile")
        console.log(tile)
        this.props.setTile(tile, "player1")
    }

    createTiles() {
        let tiles = []
        for(var i=0; i<9; i+=3) {
            tiles.push((
                <Row key={i}>
                    <Tile onClick={(e) => this.handleClick(e)} data-tile={i} key={i} />
                    <Tile onClick={(e) => this.handleClick(e)} data-tile={i+1} key={i+1} />
                    <Tile onClick={(e) => this.handleClick(e)} data-tile={i+2} key={i+2} />
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

function mapStateToProps(state) {
    return {
        ticTacToe: state.TicTacToe
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setTile
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TicTacToe)