const express = require('express')
const path = require('path')

const app = express()
const PORT = 3000

app.use(express.json())

// Servir arquivos estáticos da pasta 'src'
app.use(express.static(path.join(__dirname, '../src')))

// Rota para carregar o HTML corretamente
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../src/index.html'))
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
