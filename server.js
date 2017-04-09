const express = require("express");
const socket = require("socket.io");
const path = require("path");

const app = express();

app.use(express.static(__dirname));
app.use("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "index.html"));
})

const server= app.listen(8000, () => console.log("running on port 8000"));

const io = socket(server);
io.on("connection", (socket) => {
    console.log(`${socket.id} connected to the game`);
    
    socket.on("move", (data) => {
        console.log(data);
        socket.broadcast.emit("move", data);
    })

    socket.on("reset", () => {
        io.emit("reset");
    })
})