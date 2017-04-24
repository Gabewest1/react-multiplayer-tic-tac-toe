import {
    SET_TILE
} from "./constants"

let initialState = {
    board: createBoard(),
    player1: undefined,
    player2: undefined,
    spectators: []
}

export default function ticTacToeReducer(state = initialState, action) {
    console.log("ticTacToe reducer entered", action.type)
    switch(action.type) {
        case SET_TILE: 
            return {...state, board: action.payload}
        default:
            return state
    }
}

function createBoard() {
    let board = []
    for(var i=0; i<3; i++) {
        board.push([])
    }
    return board
}