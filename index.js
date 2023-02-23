require('dotenv').config()

const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const router = require('./router/index')
const errorMiddleware = require('./middlewares/errorMiddleware')

const PORT = process.env.PORT
const HOST = process.env.HOST

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: 'localhost:3000'
}))
app.use('/api', router)
app.use(errorMiddleware)

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, HOST, () => console.log(`Server started: http://${HOST}:${PORT}`))
    }
    catch (error) {
        console.log('[Index][f-start] Error: ', error)
    }
}

start()