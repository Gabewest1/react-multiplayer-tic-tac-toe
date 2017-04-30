import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"

import TicTacToeBoard from "components/TicTacToeBoard"
import Tile from "components/TicTacToeTile" 
import PlayersNameDisplay from "components/PlayersNameDisplay"

import Button from "./Button"
import Wrapper from "./Wrapper"
import Row from "./Row"

import * as actions from "./actions"

class TicTacToe extends React.Component {
    componentWillMount() {
        
    }
    handleClick(e) {
        let { usersPlayer, gameOver } = this.props
        let selectedTile = e.target.getAttribute("data-tile")
        
        if(usersPlayer.isPlayersTurn && !gameOver && this.isTileEmpty(selectedTile)) {
            this.props.setTile(selectedTile, usersPlayer.team)
            this.props.endTurn()
            //set timeout allows the setTile event to complete and update the players
            //board, before trying to evaluate it
            setTimeout( () => this.props.evaluateBoard(), 10)
        }
    }
    isTileEmpty(tile) {
        let row = Math.floor(tile / 3)
        let column = tile - row*3
        return this.props.board[row][column] === undefined ? true : false
    }
    createTiles() {
        let counter = 0
        return this.props.board.map((row, i) => {
            return (
                <Row key={i}>
                    {row.map(tile => {
                        return (
                            <Tile onClick={(e) => this.handleClick(e)}
                                  team={tile}
                                  data-tile={counter}
                                  key={counter++} />
                        )
                     })
                    }
                </Row>
            )
        })
    }

    render() {
        let { player1, player2, gameOver, winner } = this.props
        return (
            <Wrapper>
                <PlayersNameDisplay players={[player1, player2]}/>
                <TicTacToeBoard>
                    {this.createTiles()}
                </TicTacToeBoard>
                { gameOver ? (<div>Game Over! {winner.name} Won!</div>) : null }
                <Button onClick={this.props.resetGame.bind(this)}>Restart</Button>
            </Wrapper>
        )
    }
}

function mapStateToProps(state) {
    return {
        ...state.ticTacToe
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TicTacToe)