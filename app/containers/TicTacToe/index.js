import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"

import TicTacToeBoard from "../../components/TicTacToeBoard"
import Tile from "../../components/TicTacToeTile" 
import PlayersNameDisplay from "../../components/PlayersNameDisplay"

import ResetButton from "./ResetButton"
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
            this.setTile(selectedTile, usersPlayer.team)
        }
    }
    setTile(tile, team) {
        console.log("SETTING TILE:", tile, team)
        this.props.setTile(tile, team)
        this.props.endTurn()
        
        //set timeout allows the setTile event to complete and update the players
        //board, before trying to evaluate it for a winner
        setTimeout(() => this.props.evaluateBoard(), 100)
    }
    performComputersTurn() {
        let { board, gameOver, player1, player2, usersPlayer } = this.props 

        let computersPlayer = (usersPlayer === player1) ? player2 : player1 
        if(!computersPlayer.isPlayersTurn || gameOver) {
            console.log("OH shit it aint my turn...")
            return
        }
        let computersNextMoveIndex = undefined

        let winningPaths = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [6,4,2]
        ]

        let usersSelectedTileIndexes = board.reduce((selectedIndexes, row, i) => {
            row.forEach((tile, j) => {
                if(tile === usersPlayer.team) {
                    selectedIndexes.push(i*3 + j)
                }
            })
            return selectedIndexes
        }, [])
        let computersSelectedTileIndexes = board.reduce((selectedIndexes, row, i) => {
            row.forEach((tile, j) => {
                if(tile === computersPlayer.team) {
                    selectedIndexes.push(i*3 + j)
                }
            })
            return selectedIndexes
        }, [])

        //Search for a move that can either: 1)win the computer the game. 2)stop the player from winning.
        //3)pick a random tile. In that order. 
        computersNextMoveIndex = this.findWinningMove(winningPaths, computersSelectedTileIndexes)
        computersNextMoveIndex = computersNextMoveIndex || this.findBlockingMove(winningPaths, usersSelectedTileIndexes)
        computersNextMoveIndex = computersNextMoveIndex || this.getRandomEmptyTile(usersSelectedTileIndexes, computersSelectedTileIndexes)

        if(!computersNextMoveIndex) {
            let possibleTileIndexes = [0,1,2,3,4,5,6,7,8]
            let openTiles = possibleTileIndexes.filter(tile => !usersSelectedTileIndexes.includes(tile))
                                               .filter(tile => !computersSelectedTileIndexes.includes(tile))
            computersNextMoveIndex = openTiles[0]
        }

        this.setTile(computersNextMoveIndex, computersPlayer.team)
    }
    findWinningMove(winningPaths, computersSelectedTileIndexes) {
        let computersNextMoveIndex = undefined
        winningPaths.forEach(path => {
            let computersMatches = path.filter(tile => computersSelectedTileIndexes.includes(tile))
            if(computersMatches.length === 2 && !computersNextMoveIndex) {
                let openTile = path.filter(tile => !computersMatches.includes(tile))[0]
                computersNextMoveIndex = this.isTileEmpty(openTile) ? openTile : undefined 
            }
        })
        return computersNextMoveIndex
    }
    findBlockingMove(winningPaths, usersSelectedTileIndexes) {
        let computersNextMoveIndex = undefined
        winningPaths.forEach(path => {
            let p1Matches = path.filter(tile => usersSelectedTileIndexes.includes(tile))
            if(p1Matches.length === 2 && !computersNextMoveIndex) {
                let openTile = path.filter(tile => !p1Matches.includes(tile))[0]
                computersNextMoveIndex = this.isTileEmpty(openTile) ? openTile : undefined 
            }
        })
        return computersNextMoveIndex
    }
    getRandomEmptyTile(usersSelectedTileIndexes, computersSelectedTileIndexes) {
        let computersNextMoveIndex = undefined
        let possibleTileIndexes = [0,1,2,3,4,5,6,7,8]
        let openTiles = possibleTileIndexes.filter(tile => !usersSelectedTileIndexes.includes(tile))
                                            .filter(tile => !computersSelectedTileIndexes.includes(tile))
        computersNextMoveIndex = openTiles[0]
        return computersNextMoveIndex
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
    renderGameOverResults(winner) {
        return (winner === "draw") ? 
                    (<div>Game Over! It's a Draw...</div>) : 
                    (<div>Game Over! {winner.name} Won!</div>)
    }

    render() {
        let { player1, player2, gameOver, winner, usersPlayer, isOnlineMatch } = this.props

        if(!isOnlineMatch) {
            //If it's the computers turn, then wait 3s then perform its turn
            setTimeout(() => {
                if(!usersPlayer.isPlayersTurn) {
                    console.log("About to perform this niggas move")
                    this.performComputersTurn()
                }
            }, 3000)
        }

        return (
            <Wrapper>
                <PlayersNameDisplay players={{player1, player2}}/>
                <TicTacToeBoard>
                    {this.createTiles()}
                </TicTacToeBoard>
                { gameOver ? this.renderGameOverResults(winner) : null }
                <ResetButton onClick={this.props.resetGame.bind(this)}>Restart</ResetButton>
            </Wrapper>
        )
    }
}

function mapStateToProps(state) {
    return {
        ...state.ticTacToe,
        isOnlineMatch: state.matchMaking.isOnlineMatch
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TicTacToe)