import io from "socket.io-client"
let socket = io("http://192.168.1.91:8000/")
export default socket
