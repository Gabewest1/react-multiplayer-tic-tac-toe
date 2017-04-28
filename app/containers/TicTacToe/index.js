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
        
        if(usersPlayer.isPlayersTurn && !gameOver) {
            let selectedTile = e.target.getAttribute("data-tile")
            this.props.setTile(selectedTile, usersPlayer.team)
            this.props.endTurn()
            this.props.evaluateBoard()
        }
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