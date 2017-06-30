export default (team, board) => {         
    let winningPaths = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [6,4,2]
    ]
    let usersSelectedTileIndexes = board.reduce((selectedIndexes, row, i) => {
        row.forEach((tile, j) => {
            if(tile === team) {
                selectedIndexes.push(i*3 + j)
            }
        })
        return selectedIndexes
    }, [])
    
    let didPlayerWin = false
    winningPaths.forEach(path => {
        let matchingTiles = path.filter(tile => usersSelectedTileIndexes.indexOf(tile) >= 0)
        if(matchingTiles.length === 3) {
            didPlayerWin = true
        }
    })

    return didPlayerWin 
}