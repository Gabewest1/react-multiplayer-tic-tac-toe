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
        let { usersPlayer } = this.props
        
        if(usersPlayer.isPlayersTurn) {
            let selectedTile = e.target.getAttribute("data-tile")
            this.props.setTile(selectedTile, usersPlayer.team)
            this.props.endTurn()
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
        console.log(this.props)
        let { player1, player2 } = this.props
        return (
            <Wrapper>
                <PlayersNameDisplay players={[player1, player2]}/>
                <TicTacToeBoard>
                    {this.createTiles()}
                </TicTacToeBoard>
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