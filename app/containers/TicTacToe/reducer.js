import {
    SET_TILE
} from "./constants"

let initialState = {
    board: createBoard(),
    player1: {name: undefined, team: undefined, isPlayersTurn: undefined},
    player2: {name: undefined, team: undefined, isPlayersTurn: undefined},
    usersPlayer: undefined,
    gameOver: false,
    winner: undefined,
    spectators: []
}
//
export default function ticTacToeReducer(state = initialState, action) {
    switch(action.type) {
        case SET_TILE: 
            return {
                ...state, 
                board: setTile(state.board, action.tile, action.team)
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
        case "SET_USERS_PLAYER":
            return {...state, usersPlayer: state[action.usersPlayer]}
        case "END_TURN": {
            let newState = {...state}
            newState.player1.isPlayersTurn = !newState.player1.isPlayersTurn
            newState.player2.isPlayersTurn = !newState.player2.isPlayersTurn
            return newState
        }
        case "RESET_TIC_TAC_TOE":
            return {...state, board: createBoard(), gameOver: false, winner: undefined}
        case "GAME_OVER":
            return {...state, gameOver: true}
        case "TIC_TAC_TOE_WINNER": 
            return {...state, winner: action.winner, gameOver: true}
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