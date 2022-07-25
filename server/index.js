
const dotenv = require('dotenv');
const cors = require('cors');
const {app, http} = require('./serverConfig')()
const router = require('./router/routes')
const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');
const apiErrMiddleware = require('./middlewares/error-middleware')


dotenv.config({
    path: `${__dirname}/.env`
})
require('./core/db')

app.enable('trust proxy')
app.use(cookieParser())
app.use(bodyParser.json());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))

app.use('/api', router)
app.use(apiErrMiddleware)

const server = http.listen(process.env.PORT || 3001, () => {
    const { port } = server.address();
    console.log(`Listening on port ${port}`);
});