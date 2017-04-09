const socket = io();
socket.on("move", handleOpponentsMove);
socket.on("reset", resetBoard);

let isPlayer1Turn = true;

$(document).ready(() => {
    console.log("running");
    $(".tile").click(handleTileClick);

    let resetGameButton = $("#reset").click(resetGame);
})

function handleTileClick(e) {
        console.log("that tickled c:");
        let tile = e.target;
        let data = {tileIndex: $(tile).data("index")};
        let tileIsAlreadySet = tile.classList.contains("blue") || tile.classList.contains("red");

        if(tileIsAlreadySet) {
            alert("That tile has already been chosen! Go again...");
            return;
        }
        if(isPlayer1Turn) {
            tile.classList.add("red");
            isPlayer1Turn = false;
        } else {
            tile.classList.add("blue");
            isPlayer1Turn = true;
        }

        socket.emit("move", data);
        isGameOver();
}

function handleOpponentsMove({tileIndex}) {
        let tile = $(".tile").filter(index => index === tileIndex)[0];
        
        if(isPlayer1Turn) {
            tile.classList.add("red");
            isPlayer1Turn = false;
        } else {
            tile.classList.add("blue");
            isPlayer1Turn = true;
        }
        isGameOver();
}

function resetGame() {
    socket.emit("reset");
}
function resetBoard() {
    $(".tile").removeClass("red")
              .removeClass("blue");
}
function isGameOver() {
    console.log("isGameOver is running");
    let player1Tiles = $(".red").map((index, tile) => $(tile).data("index"));
    let player2Tiles = $(".blue").map((index, tile) => $(tile).data("index"));
    player1Tiles = Array.from(player1Tiles);
    player2Tiles = Array.from(player2Tiles);
    
    console.log(player1Tiles);
    console.log(player2Tiles);
    let winningIndexes = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [6,4,2]
    ]
    let didPlayer1Win = false;
    let didPlayer2Win = false;
    winningIndexes.forEach(path => {
        let p1Matches = path.filter(index => player1Tiles.indexOf(index) !== -1);
        let p2Matches = path.filter(index => player2Tiles.indexOf(index) !== -1);
        if(p1Matches.length === 3) {
            didPlayer1Win = true;
        } else if(p2Matches.length === 3) {
            didPlayer2Win = true;
        }

    })

    if(didPlayer1Win) {
        gameOver("player1");
    } else if(didPlayer2Win) {
        gameOver("player2");
    }
}

function gameOver(player) {
    alert(`${player} won the game!!!`);
}