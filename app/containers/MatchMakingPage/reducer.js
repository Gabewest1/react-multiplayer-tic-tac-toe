import {
    FOUND_OPPONENT,
    ERROR
} from "./constants"

let initialState = {
    foundOpponent: false,
    error: false
}

export default function matchMakingReducer(state = initialState, action) {
    switch(action.state) {
        case FOUND_OPPONENT:
            return {...state, foundOpponent: true}
        case ERROR:
            return {...state, error: true}
        default:
            return state
    }
}