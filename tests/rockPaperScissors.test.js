const chai = require("chai");
const determineWinner = require("../app/rockPaperScissors");
const expect = chai.expect;
const io = require("socket.io-client");

describe("checking if my function to determine a winner to rock paper scissors works", () => {
    let server, 
        options = {
            transports: ["websocket"],
            "forceNew": true
        }
    beforeEach((done) => {
        server = require("../server/server.js").server;
        done();
    })
    it("echos message", function (done) {
        var client = io.connect("http://localhost:8000", options);
 
        client.once("connect", function () {
            client.once("echo", function (message) {
                message.should.equal("Hello World");
 
                client.disconnect();
                done();
            });
 
            client.emit("echo", "Hello World");
        });
    });
    // it("should return p1 as the winner", () => {
    //     expect(determineWinner("rock", "scissors")).to.equal("p1");
    //     expect(determineWinner("paper", "rock")).to.equal("p1");
    //     expect(determineWinner("scissors", "paper")).to.equal("p1");
    // })
    // it("should return p2 as the winner", () => {
    //     expect(determineWinner("rock", "paper")).to.equal("p2");
    //     expect(determineWinner("paper", "scissors")).to.equal("p2");
    //     expect(determineWinner("scissors", "rock")).to.equal("p2");
    // })
    // it("should return draw", () => {
    //     expect(determineWinner("rock", "rock")).to.equal("draw");
    //     expect(determineWinner("paper", "paper")).to.equal("draw");
    //     expect(determineWinner("scissors", "scissors")).to.equal("draw");
    // })
})