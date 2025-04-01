const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const path = require('path')
const Login = require('./models/model')
require('dotenv').config();

function verifySession (req,res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/');
    }
}

const app = express()
const PORT = 3000

app.use(express.json())

mongoose.connect(`mongodb+srv://pedrocontahf:${process.env.DB_PASSWORD}@cluster.jf1b1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster`);

app.use(session({
    secret: "senhaSecretaDoPedro123",
    resave: false,
    saveUninitialized: false
}));    

app.use(express.static(path.join(__dirname, '../src')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../src/index.html'))
});

app.get('/new', verifySession, (req, res) => {
    res.sendFile(path.join(__dirname, '../src/new.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`)
})


///Registro
app.post('/register', async (req, res) => {
    const { user, password } = req.body;
    const existingUser = await Login.findOne({ user });

    if (existingUser) {
        return res.status(400).json({ error: 'Usuário já está sendo utilizado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const saveLogin = new Login({ user, password: hashedPassword });
    await saveLogin.save();
    res.json(saveLogin);
});


///Login
app.post('/login', async (req, res) => {
    const { user, password } = req.body;
    const loginUser = await Login.findOne({ user })

    if(!loginUser) {
        return res.status(400).json({ error: 'Usuário não encontrado' });
    }

    const validation = await bcrypt.compare(password, loginUser.password)

    if(!validation) {
        return res.status(400).json({ error: 'Senha incorreta' });
    }

    req.session.user = loginUser.user

    res.json({ message: 'Login bem-sucedido' });
});
