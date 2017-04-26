export function setPlayer(player, team) {
    return {
        type: "SET_PLAYER",
        player,
        team
    }
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