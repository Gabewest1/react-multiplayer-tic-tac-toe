let initialState = {
    results: false,
    winner: false,
    won: false,
    loss: false,
    draw: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case "ROCK_PAPER_SCISSORS_WINNER":
            return {...state, winner: action.winner}
        case "ROCK_PAPER_SCISSORS_WON":
            return {...state, results: true, won: true}
        case "ROCK_PAPER_SCISSORS_LOSS":
            return {...state, results: true, loss: true}
        case "ROCK_PAPER_SCISSORS_DRAW":
            return {...state, results: true, draw: true}
        case "ROCK_PAPER_SCISSORS_RESET":
            return initialState
        default: 
            return state
    }
}