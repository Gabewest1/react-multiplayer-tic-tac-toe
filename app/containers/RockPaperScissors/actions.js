export function setPlayer(player, team, isPlayersTurn) {
    return (dispatch) => {
        dispatch({
            type: "server/SET_PLAYER",
            player,
            team,
            isPlayersTurn
        })
        setTimeout(() => {
            dispatch({
                type: "SET_USERS_PLAYER",
                usersPlayer: player
            })
        },2000)
    }
}

export function handleLoss() {
    return setPlayer("player2", "o", false)
}
export function handleWin() {
    return setPlayer("player1", "x", true)
}

export function rockPaperScissors(choice) {
    return (dispatch, getState) => {
        let isOnlineMatch = getState().matchMaking
        let type = isOnlineMatch ? "server/ROCK_PAPER_SCISSORS_MOVE" : "ROCK_PAPER_SCISSORS_MOVE"
        
        dispatch({
            type,
            payload: choice
        })
    }
}

export function resetRockPaperScissors() {
    return {
        type: "ROCK_PAPER_SCISSORS_RESET"
    }
}