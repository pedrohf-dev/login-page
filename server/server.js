const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
require('dotenv').config();

const app = express()
const PORT = 3000

app.use(express.json())

mongoose.connect(`mongodb+srv://pedrocontahf:${process.env.DB_PASSWORD}@cluster.jf1b1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster`);

app.use(express.static(path.join(__dirname, '../src')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../src/index.html'))
})

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`)
})
