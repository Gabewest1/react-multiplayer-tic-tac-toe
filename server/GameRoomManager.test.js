const chai = require("chai")
const expect = chai.expect
const should = chai.should()
const io = require("socket.io-client")
const colors = require("colors")
const PORT = require("./server").port
const SERVER_URL = `http://localhost:${PORT}`

class SocketMock {
    constructor(testFn) {
        this.testFn = testFn || function() {}
        this.id = Math.random() * 1000
    }
    emit(event, action) {
        this.testFn(action)
    }
}

describe("GameManager", () => {
    let gameRoomManager
    
    beforeEach((done) => {
        gameRoomManager = new (require("./GameRoomManager"))()
        done()
    })
    // it("should add a player to a game room", (done) => {
    //     client.on("connect", () => {
    //         gameRoomManager.addPlayer(client)
    //         let playersGameRoom = gameRoomManager.findPlayersGameRoom(client)
    //         expect(playersGameRoom.players[0]).to.equal(client)
    //         client.disconnect()
    //         done()
    //     })
    // })
    // it("should add a spectator to a game room", (done) => {

    //     client.on("connect", () => {
    //         gameRoomManager.addSpectator(client)

    //         let playersGameRoom = gameRoomManager.findPlayersGameRoom(client)

    //         expect(playersGameRoom.spectators[0]).to.equal(client)
    //         client.disconnect()
    //         done()
    //     })
    // })
    // it("should have 1 game room setup after adding 1 players", (done) => {
    //     gameRoomManager.addPlayer(client)
    //     gameRoomManager.gameRooms.length.should.equal(1)

    //     client.disconnect()
    //     done()
    // })
    // it("should have 1 game room setup after adding 2 players", (done) => {
    //     let client2 = io(SERVER_URL)
    //     gameRoomManager.addPlayer(client)
    //     gameRoomManager.addPlayer(client2)
    //     gameRoomManager.gameRooms.length.should.equal(1)

    //     client.disconnect()
    //     client2.disconnect()
    //     done()
    // })
    // it("should have 2 game rooms setup after adding 3 players", (done) => {
    //     let client2 = io(SERVER_URL)
    //     let client3 = io(SERVER_URL)

    //     gameRoomManager.addPlayer(client)
    //     gameRoomManager.addPlayer(client2)
    //     gameRoomManager.addPlayer(client3)

    //     gameRoomManager.gameRooms.length.should.equal(2)

    //     client.disconnect()
    //     client2.disconnect()
    //     client3.disconnect()
    //     done()
    // })
    // it("should have 2 game rooms setup after adding 4 players", (done) => {
    //     let client2 = io(SERVER_URL)
    //     let client3 = io(SERVER_URL)
    //     let client4 = io(SERVER_URL)
       
    //     gameRoomManager.addPlayer(client)
    //     gameRoomManager.addPlayer(client2)
    //     gameRoomManager.addPlayer(client3)
    //     gameRoomManager.addPlayer(client4)

    //     gameRoomManager.gameRooms.length.should.equal(2)

    //     client.disconnect()
    //     client2.disconnect()
    //     client3.disconnect()
    //     client4.disconnect()
    //     done()
    // }) 
    it("should alert everyone in a game room when 2 players are found and ready to start the match", (done) => {
        let client2 = io(SERVER_URL)
        let clientMock = {emit: (event, action) => {
            console.log("CALLED EMIT".america, action)
            expect(action.type).to.equal("FOUND_OPPONENT")
        }}
        let client2Mock = {}
        client2Mock.emit = clientMock.emit

        client.on("connect", () => {
            gameRoomManager.addPlayer(clientMock)   
        })

        client2.on("connect", () => {
            gameRoomManager.addPlayer(client2Mock)  
        })

        setTimeout(() => done(), 1400)
    })
    // it("should find the game room containing a given player's socket", (done) => {
    //     let foundGameRoom = false
    //     client.on("connect", () => {
    //         gameRoomManager.addPlayer(client)
    //         let gameRoom = gameRoomManager.findPlayersGameRoom(client)
            
    //         if(gameRoom.players.indexOf(client) !== -1) {
    //             foundGameRoom = true
    //         } else {
    //             foundGameRoom = false
    //         }

    //         foundGameRoom.should.equal(true)
    //         client.disconnect()
    //         done()
    //     })
    // })
    // it("should return undefined when looking for a game room of a non-existant player", (done) => {
    //     client.on("connect", () => {
    //         let gameRoom = gameRoomManager.findPlayersGameRoom(client)
    //         expect(gameRoom).equal(undefined)
            
    //         client.disconnect()
    //         done()
    //     })
    // })
    it("should alert players of the rock-paper-scissors results", (done) => {
        let client2 = io(SERVER_URL)
        let clientSawMessage = false
        let client2SawMessage = false

        client.on("connect", () => {
    
            client.on("action", (winner) => {
                clientSawMessage = true
                client.disconnect()
            })

            gameRoomManager.addPlayer(client)
        })
        client2.on("connect", () => {
            client2.on("action", (winner) => {
                console.log(`Winner is ${winner}`)
                client2SawMessage = true
                client2.disconnect()
            })

            gameRoomManager.addPlayer(client2)
        })


        setTimeout(() => {
            gameRoomManager.rockPaperScissors(client2, "paper")
            gameRoomManager.rockPaperScissors(client, "rock")
            clientSawMessage.should.equal(true)
            client2SawMessage.should.equal(true)
            done()
        }, 6000)
    })
    // it("should receive players RPC move", (done) => {
    //     let move = "paper"
    //     client.on("connect", () => {
    //         gameRoomManager.addPlayer(client)
    //         gameRoomManager.rockPaperScissors(client, move)
    //     })

    //     setTimeout(() => {
    //         let gameRoom = gameRoomManager.findPlayersGameRoom(client)
    //         expect(gameRoom.rockPaperScissors[0].choice).to.equal(move)
    //         client.disconnect()
    //         done()
    //     }, 3000)
    // })
})