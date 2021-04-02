const express = require('express')
const expressHandlebars = require('express-handlebars')
const app = express() // podemos dar quaisquer nomes

// biscoito da sorte
const fortunes = [
    'conquer your fears or they will conquer you',
    'rivers need springs',
    'do not fear what you dont know ',
    'you will have a pleasant suprise',
    'wherever possible, keep it simple'
]

app.use(express.static(__dirname + '/public'))

// configura o view engine Handlebars
app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main',
}))

app.set('view engine', 'handlebars')

const port = process.env.PORT || 3000 // variável de ambiente

// o .get  é o METHOD COM O QUAL ESTAMOS ADICIONANDO ROTAS
app.get('/', (req, res) => res.render('home'))

app.get('/about', (req, res) => {
    const randomFortune = fortunes[Math.floor(Math.random()*fortunes.length)]
    res.render('about', {fortune: randomFortune}) 
})


/* METHOD use -- o express adiciona middleware manipulador de 
qualquer coisa q não coincida com uma rota */

// pág 404 personalizada
app.use((req, res) => { 
    res.status(404)
    res.render('404')
})

// pág 500 personalizada
app.use((err, req, res, next) => {
    console.error(err.message)
    res.status(500)
    res.render('500')
})

app.listen(port, () => console.log(`express started on http://localhost:${port}`))

