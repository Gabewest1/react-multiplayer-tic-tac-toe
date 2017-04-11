const express = require("express");
const socket = require("socket.io");
const path = require("path");

const app = express();

app.use(express.static("app"));;
app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname,"..", "app", "home.html"));
})
app.get("/ticTacToe", (req, res) => {
    res.sendFile(path.resolve(__dirname, "..", "app", "ticTacToe.html"))
})

const server= app.listen(8000, () => console.log("running on port 8000"));

let teams = ["X", "O"];
const io = socket(server);
io.on("connection", (socket) => {
    io.emit("reset");
    console.log(`${socket.id} connected to the game`);
    socket.emit("chooseTeam", teams, (team) => {
        console.log(`player choose to be: ${team}`);
        let index = teams.indexOf(team);
        teams.splice(index, 1);
        console.log(teams);
    });
    socket.on("move", (data) => io.emit("move", data))

    socket.on("reset", () =>io.emit("reset"))
})

io.sockets.on("connection", function (socket) {
    socket.on("echo", function (msg, callback) {
        callback = callback || function () {};
 
        socket.emit("echo", msg);
 
        callback(null, "Done.");
    });
});
module.exports.server = server;