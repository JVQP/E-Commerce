//  IMPORTANDO PACOTES //
const express = require('express');
const upload = require('express-fileupload');
const { engine } = require('express-handlebars');
const { sqlite } = require('./bancodedados.js');


// ---------- PORTA DO SERVIDOR ----- {

const PORT = process.env.BASE_URL || 8080; 

// ------------------------------ }


// -----  CONFIGURANDO SERVIDOR ----- {

let app = express();
app.use(express.json());
app.use(upload());
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');


app.use('/bootstrap', express.static('./node_modules/bootstrap/dist'))
app.use('/img', express.static('./img'));
app.use('/css', express.static('./css'));
app.use('/js', express.static('./js'));

// ------------------------------------------ }


// ---------------ROTAS DA PÁGINA-------------------- {

app.get('/', function(req, res){
    res.render('home');
});

app.get('/autenticacao', function(req, res){
        
    res.render('login');
})

app.get('/usuarios', function(req, res){
    res.render('cadastro_usuarios')
})
// -------------------------------------------------- }




// ---- INICIANDO O SERVIDOR -- { 

app.listen(PORT, () => {
    console.log(`127.0.0.1:${PORT}`);
})
// ----------------------------}