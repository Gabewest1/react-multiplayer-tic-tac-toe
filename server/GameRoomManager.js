const determineWinner = require("../app/utils/rockPaperScissorsWinner")
const colors = require("colors")

class GameRoomManager {
    constructor(serverSocket) {
        this.gameRooms = [];
        this.gameRoomCounter = 0;
        this.socket = serverSocket;
    }
    addPlayer(player) {
        let gameRoom = this.getOpenGame()
        gameRoom.players.push(player)
        this.isGameRoomReady(gameRoom)
    }
    addSpectator(spectator) {
        let gameRoom = this.getOpenGame()
        gameRoom.spectators.push(spectator)
    }
    createGameRoom() {
        let newGameRoom = {
            id: this.gameRoomCounter++,
            players: [],
            spectators: [],
            rockPaperScissors: []
        }
        this.gameRooms.push(newGameRoom);
        return newGameRoom
    }
    endGameRoom(gameRoom) {
        gameRoom.players.forEach(player => player.disconnect())
        gameRoom.spectators.forEach(spectator => spectator.disconnect())
        this.gameRooms = this.gameRooms.filter(room => room.id !== gameRoom.id)
    }
    isGameRoomReady(gameRoom) {
        if(gameRoom.players.length === 2) {
            this.messageGameRoom(gameRoom, "action", {type: "FOUND_OPPONENT", payload: true})
        }
    }
    messageGameRoom(gameRoom, eventName, data) {
        gameRoom.players.forEach(player => player.emit(eventName, data))
        gameRoom.spectators.forEach(player => player.emit(eventName, data))
    }
    getOpenGame() {
        let firstOpenGame;
        if(this.gameRooms.length === 0) {
            firstOpenGame = this.createGameRoom()
            return firstOpenGame
        }
        for(var i=0; i<this.gameRooms.length; i++) {
            let currentGameRoom = this.gameRooms[i]
            if(currentGameRoom.players.length === 1) {
                firstOpenGame = currentGameRoom
                return firstOpenGame
            }
        }

        return this.createGameRoom()
    }
    rockPaperScissors(player, choice) {
        let playersGameRoom = this.findPlayersGameRoom(player)

        let playerMadeMoveAlready = playersGameRoom.rockPaperScissors
                                                        .filter( ({socket}) => socket === player)
                                                        .length > 0
        if(playerMadeMoveAlready) {
            playersGameRoom.rockPaperScissors = playersGameRoom.rockPaperScissors.map((player) => 
                    player.socket === player ? {socket: player, choice} : player)
        } else {
            playersGameRoom.rockPaperScissors.push({socket: player, choice})
        }
        
        if(playersGameRoom.rockPaperScissors.length === 2) {
            console.log("dispatching a winner")
            this.dispatchRockPaperScissorsResults(playersGameRoom)
        }
    }
    dispatchRockPaperScissorsResults(gameRoom) {
        let players = gameRoom.rockPaperScissors
        let player1 = players[0]
        let player2 = players[1]

        let results = determineWinner(player1.choice, player2.choice)
        if(results === "draw") {
            this.resetRockPaperScissors(gameRoom)
        } else if(results === "p1") {
            player1.socket.emit("action", {type: "ROCK_PAPER_SCISSORS_WON"})
            player2.socket.emit("action", {type: "ROCK_PAPER_SCISSORS_LOSS"})
            this.messageGameRoom(gameRoom, "action", {type:"ROCK_PAPER_SCISSORS_WINNER", winner: player1.socket.id})
        } else {
            player1.socket.emit("action", {type: "ROCK_PAPER_SCISSORS_LOSS"})
            player2.socket.emit("action", {type: "ROCK_PAPER_SCISSORS_WON"})
            this.messageGameRoom(gameRoom, "action", {type:"ROCK_PAPER_SCISSORS_WINNER", winner: player2.socket.id})
        }
    }
    resetRockPaperScissors(gameRoom) {
        gameRoom.rockPaperScissors = []
        console.log(colors.cyan(`gameRoom after draw: ${gameRoom}`))
        this.messageGameRoom(gameRoom, "action", {type:"ROCK_PAPER_SCISSORS_DRAW"})        
    }
    findPlayersGameRoom(player) {
        let gameRoom
        for(var i=0; i<this.gameRooms.length; i++) {
            let currentRoom = this.gameRooms[i]
            if(currentRoom.players.indexOf(player) >= 0) {
                gameRoom = currentRoom
            }
        }

        return gameRoom
    }
}

module.exports = GameRoomManager