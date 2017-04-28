export function setPlayer(player, team, isPlayersTurn) {
    return {
        type: "server/SET_PLAYER",
        player,
        team,
        isPlayersTurn
    }
}

export function handleLoss() {
    return setPlayer("player2", "o", false)
}
export function handleWin() {
    return setPlayer("player1", "x", true)
}

export function rockPaperScissors(choice) {
    return {
        type: "server/ROCK_PAPER_SCISSORS_MOVE",
        payload: choice
    }
}

export function resetRockPaperScissors() {
    return {
        type: "ROCK_PAPER_SCISSORS_RESET"
    }
}