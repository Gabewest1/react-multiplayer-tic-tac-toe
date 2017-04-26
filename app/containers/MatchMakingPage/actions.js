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

export function findOpponent() {
    return {
        type: "server/FIND_OPPONENT"
    }
}