export default (board) => {
    for(var row = 0; row<board.length; row++) {
        for(var col = 0; col < board[row].length; col++) {
            let tile = board[row][col]
            if(!tile) {
                return false
            }
        }
    }

    return true
}