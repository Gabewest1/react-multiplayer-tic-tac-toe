import {
    SET_TILE
} from "./constants"
let initialState = {
    board: createBoard()
}

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_TILE: 
            return 
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