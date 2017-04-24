export function setPlayer(player, team) {
    return {
        type: "SET_PLAYER",
        player,
        team
    }
}