import {
    SET_TILE
} from "./constants"
let initialState = {
    board: createBoard()
}

export default function ticTacToeReducer(state = initialState, action) {
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