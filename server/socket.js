module.exports = (http, options) => {
    const io = require('socket.io')(http, options);

    io.on('connection', (socket) => {
        socket.join(`user:${socket.handshake.query.id}`)
        socket.on('join', (data) => {
            console.log(data.uid, "joined")
            socket.broadcast.emit('user_join', data)
        })
        socket.on('stop', (data) => {
            console.log(`stoppped ${data.uid}, message: ${data.messageStop}`)
            io.to(`user:${data.uid}`).emit("user_stop", data.messageStop)
        })
        socket.on('stop_client', (id) => {
            //console.log(`stoppped ${data.uid}, message: ${data.messageStop}`)
            io.emit("client_stop", id)
        })
        socket.on('deal', (data) => {
            console.log(`auction deal ${data.uid} - ${data.deal}`)
            io.to(`user:${data.uid}`).emit("deal_change", data.deal)
        })
    })

    return io
}