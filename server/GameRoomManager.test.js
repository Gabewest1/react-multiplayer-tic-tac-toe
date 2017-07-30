const chai = require("chai")
const expect = chai.expect
const should = chai.should()
const io = require("socket.io-client")
const colors = require("colors")
const PORT = require("./server").port
const SERVER_URL = `http://localhost:${PORT}`

describe("GameManager", () => {
    let gameRoomManager
    let client
    let server
    let serverSocket
    beforeEach((done) => {
        server = require("./server").server
        serverSocket = require("./server").socket
        gameRoomManager = new (require("./GameRoomManager"))(serverSocket)
        client = io(SERVER_URL)
        done()
    })
    it("should add a player to a game room", (done) => {
        client.on("connect", () => {
            gameRoomManager.addPlayer(client)
            let playersGameRoom = gameRoomManager.findPlayersGameRoom(client)
            expect(playersGameRoom.players[0]).to.equal(client)
            client.disconnect()
            done()
        })
    })
    it("should add a spectator to a game room", (done) => {

        client.on("connect", () => {
            gameRoomManager.addSpectator(client)

            let playersGameRoom = gameRoomManager.findPlayersGameRoom(client)

            expect(playersGameRoom.spectators[0]).to.equal(client)
            client.disconnect()
            done()
        })
    })
    it("should have 1 game room setup after adding 1 players", (done) => {
        gameRoomManager.addPlayer(client)
        gameRoomManager.gameRooms.length.should.equal(1)

        client.disconnect()
        done()
    })
    it("should have 1 game room setup after adding 2 players", (done) => {
        let client2 = io(SERVER_URL)
        gameRoomManager.addPlayer(client)
        gameRoomManager.gameRooms.length.should.equal(1)

        client.disconnect()
        client2.disconnect()
        done()
    })
    it("should have 2 game rooms setup after adding 3 players", (done) => {
        let client2 = io(SERVER_URL)
        let client3 = io(SERVER_URL)

        gameRoomManager.addPlayer(client)
        gameRoomManager.addPlayer(client2)
        gameRoomManager.addPlayer(client3)

        gameRoomManager.gameRooms.length.should.equal(2)

        client.disconnect()
        client2.disconnect()
        client3.disconnect()
        done()
    })
    it("should have 2 game rooms setup after adding 4 players", (done) => {
        let client2 = io(SERVER_URL)
        let client3 = io(SERVER_URL)
        let client4 = io(SERVER_URL)
       
        gameRoomManager.addPlayer(client)
        gameRoomManager.addPlayer(client2)
        gameRoomManager.addPlayer(client3)
        gameRoomManager.addPlayer(client4)

        gameRoomManager.gameRooms.length.should.equal(2)

        client.disconnect()
        client2.disconnect()
        client3.disconnect()
        client4.disconnect()
        done()
    }) 
    it("should alert everyone in a game room when 2 players are found and ready to start the match", (done) => {
        let client2 = io(SERVER_URL)
        let clientWasAlerted = false
        let client2WasAlerted = false

        client.on("connect", () => {
            gameRoomManager.addPlayer(client)
            console.log("ADDED CLIENTS TO GAMEROOM".green)

        })
        client.on("action", (data) => {
            console.log(colors.green("INSIDE FAILED TEST BUT GOT MY ACTION", data))
            clientWasAlerted = true
            client.disconnect()
        })

        client2.on("connect", () => {
            gameRoomManager.addPlayer(client2)
            console.log("ADDED CLIENTS TO GAMEROOM".green)

        })
        client2.on("action", (data) => {
            console.log(colors.green("INSIDE FAILED TEST BUT GOT MY ACTION", data))
            client2WasAlerted = true
            client2.disconnect()
            done()                
        })


        // setTimeout(() => {
        //     clientWasAlerted.should.equal(true)
        //     client2WasAlerted.should.equal(true)
        //     done()
        // }, 10000)
    })
    it("should find the game room containing a give player's socket", (done) => {
        let foundGameRoom = false
        client.on("connect", () => {
            gameRoomManager.addPlayer(client)
            let gameRoom = gameRoomManager.findPlayersGameRoom(client)
            
            if(gameRoom.players.indexOf(client) !== -1) {
                foundGameRoom = true
            } else {
                foundGameRoom = false
            }

            foundGameRoom.should.equal(true)
            client.disconnect()
            done()
        })
    })
    it("should return undefined when looking for a game room of a non-existant player", (done) => {
        client.on("connect", () => {
            let gameRoom = gameRoomManager.findPlayersGameRoom(client)
            expect(gameRoom).equal(undefined)
            
            client.disconnect()
            done()
        })
    })
    it("should alert players of the rock-paper-scissors results", (done) => {
        let client2 = io(SERVER_URL)
        let clientSawMessage = false
        let client2SawMessage = false

        client.on("connect", () => {
            client.on("action", (winner) => {
                clientSawMessage = true
                client.disconnect()
            })

            gameRoomManager.rockPaperScissors(client, "rock")
        })
        client2.on("connect", () => {
            client.on("action", (winner) => {
                console.log(`Winner is ${winner}`)
                client2SawMessage = true
                client2.disconnect()
            })

            gameRoomManager.rockPaperScissors(client2, "paper")
        })

        gameRoomManager.addPlayer(client)
        gameRoomManager.addPlayer(client2)

        setTimeout(() => {
            clientSawMessage.should.equal(true)
            client2SawMessage.should.equal(true)
            done()
        }, 2000)
    })
    it("should receive players RPC move", (done) => {
        client.on("connect", () => {
            gameRoomManager.addPlayer(client)
            gameRoomManager.rockPaperScissors(client, "paper")
        })

        setTimeout(() => {
            let gameRoom = gameRoomManager.findPlayersGameRoom(client)
            expect(gameRoom.rockPaperScissors[0].socket).to.equal(client)
            client.disconnect()
            done()
        }, 3000)
    })
})