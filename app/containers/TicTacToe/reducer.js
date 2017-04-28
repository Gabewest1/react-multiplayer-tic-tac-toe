import {
    SET_TILE
} from "./constants"

let initialState = {
    board: createBoard(),
    player1: {name: undefined, team: undefined, isPlayersTurn: true},
    player2: {name: undefined, team: undefined, isPlayersTurn: false},
    currentPlayersTurn: "x",
    team: undefined,
    gameOver: false,
    winner: false,
    spectators: []
}

export default function ticTacToeReducer(state = initialState, action) {
    switch(action.type) {
        case SET_TILE: 
            return {
                ...state, 
                board: setTile(state.board, action.tile, action.team), 
                currentPlayersTurn: action.team === "x" ? "o" : "x"
            }
        case "SET_PLAYER": 
            return {
                ...state,
                [action.player]: {
                    name: action.name, 
                    team: action.team, 
                    isPlayersTurn: action.isPlayersTurn
                }
            }
        case "SET_TEAM":
            return {...state, team: action.team}
        case "RESET_TIC_TAC_TOE":
            return {...state, board: createBoard(), currentPlayersTurn: "x"}
        case "SET_CURRENT_PLAYER": {
            return {...state, currentPlayersTurn: action.player}
        }
        default:
            return state
    }
}

function createBoard() {
    let board = []
    for(var i=0; i<3; i++) {
        board.push([undefined, undefined, undefined])
    }
    return board
}

function setTile(board, tile, team) {
    tile = parseInt(tile)
    let newBoard = []
    for(var i=0; i<board.length; i++) {
        newBoard.push([])
        for(var j=0; j<board[i].length; j++) {
            if(i*3 + j === tile) {
                newBoard[i].push(team)
            } else {
                newBoard[i].push(board[i][j])
            }
        }
    }
    console.log(`new board: ${newBoard}`, tile, team)
    return newBoard
}