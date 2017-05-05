const path = require("path")
const express = require("express")
const socket = require("socket.io")
const webpack = require("webpack")
const webpackDevMiddleware = require("webpack-dev-middleware")
const webpackHotMiddleware = require("webpack-hot-middleware")
const webpackConfig = require("../webpack.config.js")

const compiler = webpack(webpackConfig)
const app = express()

app.use(webpackDevMiddleware(compiler, {publicPath: webpackConfig.output.publicPath}))
app.use(webpackHotMiddleware(compiler))

app.use(express.static(path.resolve(__dirname, "..", "app")))
app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "..", "app", "index.html"))
})

const server= app.listen(8000, () => console.log("running on port 8000"))

const io = socket(server)
const gameRoomManager = new (require("./GameRoomManager"))(io)
io.on("connection", (socket) => {
    console.log(`${socket.id} connected to the game`)
    socket.on("disconnect", () => {
        console.log(`${socket.id} disconnected`)
    })

    socket.on("action", (action) => {
        let gameRoom = gameRoomManager.findPlayersGameRoom(socket)

        switch(action.type) {
            case "server/FIND_OPPONENT": {
                gameRoomManager.addPlayer(socket)
                break
            }
            case "server/ROCK_PAPER_SCISSORS_MOVE": {
                gameRoomManager.rockPaperScissors(socket, action.payload)
                break
            }
            case "server/SET_TILE": {
                let { tile, team } = action
                gameRoomManager.messageGameRoom(gameRoom, "action", {type:"SET_TILE", tile, team})
                break
            }
            case "server/SET_PLAYER": {
                let { player, team, isPlayersTurn } = action
                let actionForReducer = {type:"SET_PLAYER", player, team, name: socket.id, isPlayersTurn}
                gameRoomManager.messageGameRoom(gameRoom, "action", actionForReducer)
                break
            }
            case "server/RESET_TIC_TAC_TOE": {
                gameRoomManager.messageGameRoom(gameRoom, "action", {type:"RESET_TIC_TAC_TOE"})
                break
            }
            case "server/SET_CURRENT_PLAYER": {
                let { players } = gameRoom
                let player = players[0] === socket ? players[0] : players[1]
                gameRoomManager.messageGameRoom(gameRoom, "action", {type: "SET_CURRENT_PLAYER", player})
                break
            }
            case "server/END_TURN": {
                gameRoomManager.messageGameRoom(gameRoom, "action", {type: "END_TURN"})
                break                
            } 
            case "server/TIC_TAC_TOE_WINNER": {
                let actionForReducer = {type: "TIC_TAC_TOE_WINNER", winner: action.winner}
                gameRoomManager.messageGameRoom(gameRoom, "action", actionForReducer)
            }
            case "server/SET_OPPONENTS_SELECTION": {
                gameRoomManager.messageGameRoom(gameRoom, "action", {type: "SET_OPPONENTS_SELECTION", payload: action.payload})
                socket.emit("action", {type: "SET_OPPONENTS_SELECTION", payload: undefined})                
            }
        }
    })
})