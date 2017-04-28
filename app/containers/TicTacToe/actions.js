import {
    SET_TILE
} from "./constants"

export function setTile(tile, team) {
    return {
        type: "server/SET_TILE",
        tile,
        team
    }
}

export function resetGame() {
    return {
        type: "server/RESET_TIC_TAC_TOE"
    }
}

export function endTurn() {
    return {
        type: "server/END_TURN"
    }
}

export function evaluateBoard() {
    return (dispatch, getState) => {
        setTimeout(() => {

            let { board, usersPlayer, player1, player2 } = getState().ticTacToe 
            console.log("Board", board, getState())
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
            let p1TileIndexes = board.reduce((indexes, row, i) => {
                row.forEach((tile, j) => {
                    if(tile === player1.team) {
                        indexes.push(i*3 + j)
                    }
                })
                return indexes
            }, [])
            let p2TileIndexes = board.reduce((indexes, row, i) => {
                row.forEach((tile, j) => {
                    if(tile === player2.team) {
                        indexes.push(i*3 + j)
                    }
                })
                return indexes
            }, [])
            let didPlayer1Win = false;
            let didPlayer2Win = false;
            winningPaths.forEach(path => {
                let p1Matches = path.filter(tile => p1TileIndexes.indexOf(tile) >= 0)
                let p2Matches = path.filter(tile => p2TileIndexes.indexOf(tile) >= 0)
                if(p1Matches.length === 3) {
                    didPlayer1Win = true;
                } else if(p2Matches.length === 3) {
                    didPlayer2Win = true;
                }
            })

            if(didPlayer1Win) {
                console.log("PLAYER1 WON")
                let { usersPlayer, player1 } = getState()
                if(usersPlayer === player1) {
                    dispatch({type: "TIC_TAC_TOE_WINNER", winner: true})
                } else {
                    dispatch({type: "TIC_TAC_TOE_WINNER", winner: false})                
                }
            } else if(didPlayer2Win) {
                console.log("PLAYER2 WON")        
                let { usersPlayer, player2 } = getState()
                if(usersPlayer === player2) {
                    dispatch({type: "TIC_TAC_TOE_WINNER", winner: true})
                } else {
                    dispatch({type: "TIC_TAC_TOE_WINNER", winner: false})                
                }
            }
        }, 1000)
    }
}