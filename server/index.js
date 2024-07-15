const express = require("express")
const app = express()
const cors = require("cors")
const todoRoute = require("./routes/todo")
const connectDB = require("./config/connectDB")

require('dotenv').config()

app.use(cors())
app.use(express.json())

const { v4: uuidv4 } = require('uuid');

connectDB()

app.use("/api/",todoRoute);

const port = process.env.PORT || 3000



// Start the server on port 3000
app.listen(port, () => console.log(`Server running at http://localhost:${port}/`))