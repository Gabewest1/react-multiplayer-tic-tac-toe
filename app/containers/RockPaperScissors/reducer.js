let initialState = {
    results: false,
    winner: false,
    draw: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case "ROCK_PAPER_SCISSORS_WINNER":
            return {...state, results: true, winner: action.payload}
        case "ROCK_PAPER_SCISSORS_DRAW":
            return {...state, results: true, draw: true}
        case "ROCK_PAPER_SCISSORS_RESET":
            return initialState
        default: 
            return state
    }
}