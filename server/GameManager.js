class GameManager {
    constructor() {
        this.games = [];
        this.gameRoomCounter = 0;
    }

    createGame() {

    }

    addPlayer(playerSocket) {
        let openGame = this.getOpenGame();
        if(!openGame) {
            this.games.push(playerSocket);
        } else {
            openGame.push(playerSocket);
        }
    }

    getOpenGame() {
        let firstOpenGame;
        if(this.games.length === 0) {
            return false;
        }
        for(var i=0; i<this.games.length; i++) {
            let currentGame = this.games[i];
            if(currentGame.length === 1) {
                firstOpenGame = currentgame;
                break;
            }
        }

        return firstOpenGame;
    }

    findGame() {
        
    }

    getPlayers(gameRoom) {
        return this.games[gameRoom];
    }
}