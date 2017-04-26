import {
    FOUND_OPPONENT,
    ERROR
} from "./constants"


export function opponentJoined() {
    return {
        type: FOUND_OPPONENT,
        payload: true
    }
}

export function opponentLeft() {
    return {
        type: FOUND_OPPONENT,
        payload: false
    }
}