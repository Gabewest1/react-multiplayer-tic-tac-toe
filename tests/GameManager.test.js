const chai = require("chai")
const expect = chai.expect
const should = chai.should()
const io = require("socket.io-client")
const colors = require("colors")

describe("GameManager", () => {
    let client
    let server
    let serverSocket
    beforeEach((done) => {
        server = require("../server/server.js").server
        serverSocket = require("../server/server.js").socket
        const GameManager = require("../server/GameManager")(serverSocket)

        client = io("http://localhost:8000")
        done()
    })
    // it("should message all players in a game room of an event", (done) => {
    //     client.on("connect", () => {
    //         client.on("")
    //     })
    // })
    it("should add a player to a game room", (done) => {
        let client2 = io("http://localhost:8000")
        client.on("connect", () => {
            client.on("player joined", (data) => {
                console.log("Client is responding!11");
                data.msg.should.equal("Hello World")

                client.disconnect()
                client2.disconnect
            })
            GameManager.addPlayer(client)
            GameManager.test.should.equal(client);
            done()
        })
    })
})