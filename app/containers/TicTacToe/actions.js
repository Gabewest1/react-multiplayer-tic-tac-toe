export function setTile(tile, team) {
    return {
        type: "SET_TILE",
        tile,
        team
    }
}