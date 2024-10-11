// console.log('hello, Nodejs')

const express = require('express') //importando a biblioteca
const cors = require('cors')

const app = express() //construindo uma aplicação express
app.use(express.json())
app.use(cors())

let filmes = [
    {
        titulo: "Halloween 2018",
        sinopse: "Quatro década depois de escapar do ataque de Michael Myers em uma noite de Halloween, Laurie Strode precisa confrontar o assassino mascarado mais uma vez após ele escapar de uma instituição. Mas, agora Laurie está preparada."
    },
    {
        titulo: "sussuros do coração",
        sinopse: "Shizuku, uma estudante que sonha ser uma escritora e decide, durante o verão, ler vinte livros. Mas, curiosamente, todas as edições que Shizuki pegou na biblioteca já haviam sido lidas por um tal de Seiji Amasawa "
    }
]

//get url: http://localhost:3000/oi
app.get ('/oi', (req, res) => {
    res.send('oi')
})

app.get ('/filmes', (req, res) => {
    res.json(filmes)
})

app.post('/filmes', (req, res) => {
    //obter os dados q o cliente enviou
    const titulo = req.body.titulo
    const sinopse = req.body.sinopse
    //montar o json filme
    const filme = {titulo: titulo, sinopse: sinopse}
    //inserir o filme na lista de filmes
    filmes.push(filme)
    res.json(filmes)
})
app.listen(3000, () => console.log("server up and running"))