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

app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "..", "app", "index.html"))
})

const server= app.listen(8000, () => console.log("running on port 8000"))

const io = socket(server)
io.on("connection", (socket) => {
    console.log(`${socket.id} connected to the game`)
    
    socket.on("move", (data) => {
        console.log(data)
        socket.broadcast.emit("move", data)
    })

    socket.on("reset", () => {
        io.emit("reset")
    })

    socket.on("action", (action) => {
        console.log("Got my test to work!")
        switch(action.type) {
            case "test":
                socket.emit("action", {type: "SET_PLAYER", player: "player1", team: "x"})
        }
    })
})