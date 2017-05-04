import {
    SET_TILE
} from "./constants"

export function setTile(tile, team) {
    return (dispatch, getState) => {
        let { isOnlineMatch } = getState().matchMaking
        let type = isOnlineMatch ? "server/SET_TILE" : "SET_TILE"

        dispatch({
            type,
            tile,
            team
        })
    }
}

export function resetGame() {
    return (dispatch, getState) => {
        let { isOnlineMatch } = getState().matchMaking
        let type = isOnlineMatch ? "server/RESET_TIC_TAC_TOE" : "RESET_TIC_TAC_TOE"
        
        dispatch({
            type
        })
    }
}

export function endTurn() {
    return (dispatch, getState) => {
        let { isOnlineMatch } = getState().matchMaking
        let type = isOnlineMatch ? "server/END_TURN" : "END_TURN"
        
        dispatch({
            type
        })
    }
}

export function evaluateBoard() {
    return (dispatch, getState) => {
        let { board, usersPlayer } = getState().ticTacToe
        let { isOnlineMatch } = getState().matchMaking
         
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
            let type = isOnlineMatch ?  "server/TIC_TAC_TOE_WINNER" : "TIC_TAC_TOE_WINNER"
            dispatch({type, winner: usersPlayer})
        } 
    }
}