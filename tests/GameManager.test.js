const chai = require("chai")
const expect = chai.expect
const should = chai.should()
const io = require("socket.io-client")
const colors = require("colors")


describe("GameManager", () => {
    let GameManager
    let client
    let server
    let serverSocket
    beforeEach((done) => {
        server = require("../server/server.js").server
        serverSocket = require("../server/server.js").socket
        GameManager = new (require("../server/GameManager"))(serverSocket)
        client = io("http://localhost:8000")
        done()
    })
    // it("should message all players in a game room of an event", (done) => {
    //     client.on("connect", () => {
    //         client.on("")
    //     })
    // })
    it("should add a player to a game room", (done) => {
        let playerWasAdded = false;
        
        client.on("connect", () => {
            client.on("player joined", (data) => {
                playerWasAdded = true;

                client.disconnect()
            })

            GameManager.addPlayer(client)
            setTimeout(() => {
                playerWasAdded.should.equal(true)
                done()
            }, 1000)
        })
    })
    it("should add a spectator to a game room", (done) => {
        let spectatorWasAdded = false;
        
        client.on("connect", () => {
            client.on("spectator joined", (data) => {
                spectatorWasAdded = true;

                client.disconnect()
            })

            GameManager.addSpectator(client)
            setTimeout(() => {
                spectatorWasAdded.should.equal(true)
                done()
            }, 1000)
        })
    })
})