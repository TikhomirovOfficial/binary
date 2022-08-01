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
            io.emit("client_stop", id)
        })
        socket.on('change_deal', (data) => {
            console.log(`auction deal all - ${data.deal}`)
            io.emit("deal_all", data.deal)
        })
        socket.on('stop_all', (data) => {
            console.log(`auction stop all - ${data}`)
            io.emit("stop_every", data)
        })
        socket.on('deal', (data) => {
            console.log(`auction deal ${data.uid} - ${data.deal}`)
            io.to(`user:${data.uid}`).emit("deal_change", data.deal)
        })
        socket.on('message', (data) => {
            console.log(`auction message ${data.uid} - ${data.message}`)
            io.to(`user:${data.uid}`).emit("message_change", data.message)
        })
    })

    return io
}