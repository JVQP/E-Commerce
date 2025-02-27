//  IMPORTANDO PACOTES //
const express = require('express');
const upload = require('express-fileupload');
const { engine } = require('express-handlebars');
const { sqlite } = require('./bancodedados.js');
const path = require('path')
const cors = require('cors');
const bodyParser = require('body-parser')


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
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));


app.use('/bootstrap', express.static('./node_modules/bootstrap/dist'))
app.use('/img', express.static('./img'));
app.use('/css', express.static('./css'));
app.use('/js', express.static(path.join(__dirname, '/js')));

// ------------------------------------------ }


// ---------------ROTAS DA PÁGINA-------------------- {

app.get('/', function(req, res){
    res.render('home');
});

app.get('/autenticacao', function(req, res){
    res.render('login');
})

app.get('/usuarios', function(req, res){
    res.render('cadastro_usuarios');
})

app.post('/cadastrar_usuarios', function(req, res) {
    
let email = req.body.inputEmail;
let senha = req.body.inputPassword;
let confirme = req.body.inputConfirm;
let adm = req.body.inputAdm;
let cliente = req.body.inputCliente;


if (!email || !senha || !confirme || !adm || !cliente) {
    console.log('Preencha todos os campos !');
    return res.render('cadastro_usuarios', { mensagem_erro: 'Por favor, Preencha todos os campos !' });

    
    } if (senha !== confirme){
      return  res.render('cadastro_usuarios', {mensagem_erro_senha: 'Senhas Incompativeis !'});
    } 

    res.render('cadastro_usuarios')
})
// -------------------------------------------------- }




// ---- INICIANDO O SERVIDOR -- { 

app.listen(PORT, () => {
    console.log(`127.0.0.1:${PORT}`);
})
// ----------------------------}