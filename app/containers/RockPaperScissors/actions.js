export function setPlayer(player, team) {
    return {
        type: "SET_PLAYER",
        player,
        team
    }
}

export function test(msg) {
    return {
        type: "server/test",
        msg
    }
}