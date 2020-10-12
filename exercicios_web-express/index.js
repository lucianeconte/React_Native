const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const saudacao = require('./saudacaomidi')
const usuarioApi = require('./api/usuario')
const produtoApi = require('./api/produto')
produtoApi(app, 'com param!')

app.post('/usuario', usuarioApi.salvar)
app.get('/usuario', usuarioApi.obter)

app.use(bodyParser.text())
app.use(bodyParser.json())

app.use(saudacao('Luciane'))

app.use('/opa', (req, res, next) => {
    console.log('Antes..')
    next()
})

app.get('/cliente/relatorio', (req, res) => {
    res.send(`Cliente relatório: completo =  ${req.query.completo} ano = ${req.query.ano}`)
})

app.post('/corpo', (req, res) => {
    // let corpo = ''
    // req.on('data', function(parte) {
    //     corpo += parte
    // })

    // req.on('end', function() {
    //     res.send(corpo)
    // })
    res.send(req.body) //req.body.nome (conteúdo do json no boby)
})

app.get('/cliente/:id', (req, res) => {
    res.send(`Cliente ${req.params.id} selecionado`)
})

//app.get ou outro, pra especificar o que quer
app.get('/opa', (req, res, next) => {
    console.log('Durante..')
    res.json([
        {id: 7, nome: 'Ana', pos: 1},
        {id: 8, nome: 'Pedro', pos: 2},
        {id: 9, nome: 'Ana', pos: 3}
    ])

    next()

    // res.json({
    //     nome: 'iPad',
    //     preco: 1898,
    //     descont0: 0.12
    // })

    // res.send('Estou <b>bem</b>')
})

app.use('/opa', (req, res) => {
    console.log('Depois..')
})

app.listen(3001, () => {
    console.log('Backend executando!')
})