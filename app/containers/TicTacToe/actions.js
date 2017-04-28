import {
    SET_TILE
} from "./constants"

export function setTile(tile, team, fromClient) {
    let action;
    if(fromClient) {
        action = {
            type: SET_TILE,
            tile,
            team
        }
    } else {
        action = {
            type: "server/SET_TILE",
            tile,
            team
        }
    }
    return action
}

export function resetGame() {
    return {
        type: "server/RESET_TIC_TAC_TOE"
    }
}

export function endTurn() {
    return {
        type: "server/END_TURN"
    }
}