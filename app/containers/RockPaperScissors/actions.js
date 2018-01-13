import getRockPaperScissorsMove from "../../utils/getRockPaperScissorsMove"
import rockPaperScissorsWinner from "../../utils/rockPaperScissorsWinner"

export function setPlayer(player, team, isPlayersTurn) {
    return (dispatch, getState) => {
        let { isOnlineMatch } = getState().matchMaking

        //If the match is local, then set the computers to the opposite of 
        //the players values 
        if(!isOnlineMatch) {
            dispatch({
                type: "SET_PLAYER",
                player: player === "player1" ? "player2" : "player1",
                name: "Computer",
                team: team === "x" ? "o" : "x",
                isPlayersTurn: !isPlayersTurn
            })
            dispatch({
                type: "SET_PLAYER",
                player,
                name: "Human",
                team,
                isPlayersTurn
            })
            dispatch({
                type: "SET_USERS_PLAYER",
                usersPlayer: player
            })
        } else {
            dispatch({
                type: "server/SET_PLAYER",
                player,
                team,
                isPlayersTurn
            })
            setTimeout(() => dispatch({
                type: "SET_USERS_PLAYER",
                usersPlayer: player
            }), 1000)
        }

    }
}

export function handleLoss() {
    return setPlayer("player2", "o", false)
}
export function handleWin() {
    return setPlayer("player1", "x", true)
}

export function rockPaperScissors(choice) {
    return (dispatch, getState) => {
        let { isOnlineMatch } = getState().matchMaking
        let type = isOnlineMatch ? "server/ROCK_PAPER_SCISSORS_MOVE" : "ROCK_PAPER_SCISSORS_MOVE"
        
        dispatch({
            type,
            payload: choice
        })
        dispatch({
            type: "SET_USERS_SELECTION",
            payload: choice
        })

        if(isOnlineMatch) {
            dispatch({
                type: "server/SET_OPPONENTS_SELECTION",
                payload: choice
            })
        } else {
            let computersRockPaperScissorsMove = getRockPaperScissorsMove()
            let winner = rockPaperScissorsWinner(choice, computersRockPaperScissorsMove)
            dispatch({
                type: "SET_OPPONENTS_SELECTION",
                payload: computersRockPaperScissorsMove
            })

            if(winner === "p1") {
                dispatch({
                    type: "ROCK_PAPER_SCISSORS_WINNER",
                    winner: "YOU"
                })
                dispatch({
                    type: "ROCK_PAPER_SCISSORS_WON",
                })
            } else if(winner === "p2") {
                dispatch({
                    type: "ROCK_PAPER_SCISSORS_WINNER",
                    winner: "COMPUTER"
                })
                dispatch({
                    type: "ROCK_PAPER_SCISSORS_LOSS",
                })
            } else {
                dispatch(resetRockPaperScissors())
            }

        }
    }
}

export function resetRockPaperScissors() {
    return {
        type: "ROCK_PAPER_SCISSORS_RESET"
    }
}