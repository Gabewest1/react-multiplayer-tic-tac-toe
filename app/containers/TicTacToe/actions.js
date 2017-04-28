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
        let { board, usersPlayer } = getState().ticTacToe 
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
       
        let didPlayerWin = false;
        winningPaths.forEach(path => {
            let p1Matches = path.filter(tile => usersSelectedTileIndexes.indexOf(tile) >= 0)
            if(p1Matches.length === 3) {
                didPlayerWin = true;
            }
        })

        if(didPlayerWin) {
            console.log("PLAYER1 WON")
            dispatch({type: "server/TIC_TAC_TOE_WINNER", winner: usersPlayer})
        } 
    }
}