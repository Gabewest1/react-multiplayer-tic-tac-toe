export function setPlayer(player, team) {
    return {
        type: "server/SET_PLAYER",
        player,
        team
    }
}

export function handleLoss() {
    return setPlayer("player2", "o")
}
export function handleWin() {
    return setPlayer("player1", "x")
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