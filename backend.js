const express = require('express') //importando a biblioteca
const cors = require('cors')
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const bcrypt = require('bcrypt')
const app = express() //construindo uma aplicação express
app.use(express.json())
app.use(cors())

const Filme = mongoose.model ("Filme", mongoose.Schema({
    titulo: {type: String},
    sinopse: {type: String}
}))

const usuarioSchema = mongoose.Schema( {
    login: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})
usuarioSchema.plugin(uniqueValidator)
const Usuario = mongoose.model ("Usuario", usuarioSchema)

async function conectarAoMongo() {
    await mongoose.connect(`mongodb+srv://kferraresilima:132147@cluster0.44qza.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
}

// let filmes = [
//     {
//         titulo: "Halloween 2018",
//         sinopse: "Quatro década depois de escapar do ataque de Michael Myers em uma noite de Halloween, Laurie Strode precisa confrontar o assassino mascarado mais uma vez após ele escapar de uma instituição. Mas, agora Laurie está preparada."
//     },
//     {
//         titulo: "sussuros do coração",
//         sinopse: "Shizuku, uma estudante que sonha ser uma escritora e decide, durante o verão, ler vinte livros. Mas, curiosamente, todas as edições que Shizuki pegou na biblioteca já haviam sido lidas por um tal de Seiji Amasawa "
//     }
// ]

//get url: http://localhost:3000/oi
app.get ('/oi', (req, res) => {
    res.send('oi')
})

app.get ('/filmes', async (req, res) => {
    const filmes = await Filme.find()
    res.json(filmes)
})

app.post('/filmes', async(req, res) => {
    //obter os dados q o cliente enviou
    const titulo = req.body.titulo
    const sinopse = req.body.sinopse
    //construir um objeto filme de acordo com a classe Filme definida
   const filme = new Filme({titulo: titulo, sinopse: sinopse})
    //salva o filme criado
    await filme.save()
    //busca pela lista de filmes atualizada
    const filmes = await Filme.find()
    res.json(filmes)
})
app.post('/signup', async (req, res) => {
    try {
    const login = req.body.login
    const password = req.body.password
    const password_criptografada = await bcrypt.hash(password, 10)
    const usuario = new Usuario ({login: login, password: password_criptografada})
    const respMongo = await usuario.save()
    console.log(respMongo)
    res.status(201).end()
    }
    catch (e) {
        console.log(e)
        res.status(409).end()
    }
})

app.listen(3000, () => {
    try {
    conectarAoMongo()
     console.log("server up and running and conexão ok")
    }
    catch (e) {
        console.log('deu ruim paizão não conectou', e)
    }
})