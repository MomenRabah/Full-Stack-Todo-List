require('dotenv').config();
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/database')
const todoRoutes = require('./routes/todoRoutes')
const errorHandler = require('./middleware/errorHandler')

const app = express()

app.use(cors())
app.use(express.json())

connectDB()

app.use('/api', todoRoutes)

app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
