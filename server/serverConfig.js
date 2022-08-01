module.exports = () => {
    const express = require("express");
    const options = {
        cors: true,
        origins: ["*"]
    }

    const app = express();
    const http = require('http').Server(app);
    const io = require('./socket')(http, options)

    return {
        app,
        options,
        http,
        io
    }
}
