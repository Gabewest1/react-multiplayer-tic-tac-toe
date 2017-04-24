import {
    SET_TILE
} from "./constants"

export function setTile(tile, team) {
    return {
        type: SET_TILE,
        tile,
        team
    }
}