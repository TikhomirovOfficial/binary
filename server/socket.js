module.exports = (http, options) => {
    const io = require('socket.io')(http, options);

    io.on('connection', (socket) => {
        socket.on('join', (data) => {
            socket.broadcast.emit('user_join', data)
        })
    })

    return io
}