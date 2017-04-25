import {
    SET_TILE
} from "./constants"

let initialState = {
    board: createBoard(),
    player1: undefined,
    player2: undefined,
    currentPlayersTurn: undefined,
    gameOver: false,
    winner: false,
    spectators: []
}

export default function ticTacToeReducer(state = initialState, action) {
    console.log(action.type, action.player, action.team)
    switch(action.type) {
        case SET_TILE: 
            return {...state, board: setTile(state.board, action.tile, action.team)}
        case "SET_PLAYER": 
            return {...state, [action.player]: action.team}
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