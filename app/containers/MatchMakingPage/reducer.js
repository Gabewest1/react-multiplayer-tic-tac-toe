import {
    FOUND_OPPONENT,
    ERROR
} from "./constants"

let initialState = {
    foundOpponent: false,
    error: false
}

export default function matchMakingReducer(state = initialState, action) {
    switch(action.type) {
        case FOUND_OPPONENT:
            return {...state, foundOpponent: action.payload}
        case ERROR:
            return {...state, error: true}
        default:
            return state
    }
}