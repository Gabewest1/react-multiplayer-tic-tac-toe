import didPlayerWinTicTacToe from "../../utils/didPlayerWinTicTacToe"
import isBoardFull from "../../utils/isBoardFull"
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
        let { board, usersPlayer, player1, player2 } = getState().ticTacToe
        let { isOnlineMatch } = getState().matchMaking
        let opponent = (usersPlayer === player1) ? player2 : player1

        let didPlayerWin = didPlayerWinTicTacToe(usersPlayer.team, board)
        
        if(isOnlineMatch) {
            if(didPlayerWin) {
                dispatch({type: "server/TIC_TAC_TOE_WINNER", winner: usersPlayer})
            } else {
                let isDraw = isBoardFull(board)
                if(isDraw) {
                    dispatch({type: "TIC_TAC_TOE_WINNER", winner: "draw"})
                }
            } 
        } else {
            let didOpponentWin = didPlayerWinTicTacToe(opponent.team, board)
            if(didPlayerWin) {
                dispatch({type: "TIC_TAC_TOE_WINNER", winner: usersPlayer})
            } else if(didOpponentWin) {
                dispatch({type: "TIC_TAC_TOE_WINNER", winner: opponent})
            } else {
                let isDraw = isBoardFull(board)
                if(isDraw) {
                    dispatch({type: "TIC_TAC_TOE_WINNER", winner: "draw"})
                }
            }
        }

    }
}