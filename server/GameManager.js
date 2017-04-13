class GameManager {
    constructor(serverSocket) {
        this.gameRooms = [];
        this.gameRoomCounter = 0;
        this.socket = serverSocket;
        this.test;
    }

    showGames() {
        this.gameRooms.forEach(room => console.log(room))
    }

    createGameRoom() {
        let newGameRoom = {
            id: this.gameRoomCounter++,
            players: [],
            spectators: []
        }
        this.gameRooms.push(newGameRoom);
        return newGameRoom
    }

    addPlayer(player) {
        let openGame = this.getOpenGame()
        openGame.players.push(player)
        console.log("player added!!!")
        this.test = player;
        player.emit("player joined", {msg: "Hello world"})
        // this.messageGameRoom(openGame.id, "player joined", {msg: "Hello World"})
    }

    messageGameRoom(gameRoomId, eventName, data) {
        let gameRoom = this.gameRooms.filter(room => room.id === gameRoomId)
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
                firstOpenGame = currentGameRoom;
                return firstOpenGame
            }
        }

        return this.createGameRoom()
    }

    findGame() {
        
    }
    findPlayersGame(player) {

    }
    getPlayers(gameRoom) {
        return this.gameRooms[gameRoom];
    }
}

module.exports = new GameManager();