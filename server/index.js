const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const router = require('./router/routes')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const apiErrMiddleware = require('./middlewares/error-middleware')

dotenv.config({
    path: `${__dirname}/.env`
})
require('./core/db')


const app = express();
app.use(cookieParser())
app.use(bodyParser.json());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))

app.use('/api', router)
app.use(apiErrMiddleware)

app.listen(process.env.SERVER_PORT, () => {
    console.log('Server run on port', process.env.SERVER_PORT)
})