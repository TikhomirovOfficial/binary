module.exports = (http, options) => {
    const io = require('socket.io')(http, options);

    io.on('connection', (socket) => {
        socket.on('join', (data) => {
            socket.join(`user:${data.uid}`)
            console.log(data.uid)
            socket.broadcast.emit('user_join', data)
            console.log(socket.rooms)
        })
        socket.on('stop', (data) => {
            console.log(`stoppped ${data.uid}, message: ${data.messageStop}`)
            io.to(`user:${data.uid}`).emit("user_stop", data.messageStop)
        })
        socket.on('deal', (data) => {
            console.log(`auction deal ${data.uid} - ${data.deal}`)
            io.to(`user:${data.uid}`).emit("deal_change", data.deal)
        })
    })

    return io
}