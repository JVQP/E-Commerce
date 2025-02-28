//  IMPORTANDO PACOTES //
const express = require('express');
const upload = require('express-fileupload');
const { engine } = require('express-handlebars');
const { sqlite } = require('./bancodedados.js');
const path = require('path')
const cors = require('cors');
const bodyParser = require('body-parser')



// --------- BANCO DE DADOS CONFIGURAÇÃO ---- {


const db = new sqlite.Database('Database.sqlite', (err) => {
    if (!err) {
        console.log(`Conexão com Banco de dados sucedida!`);
    } else {
        console.log(`Erro ao conectar com o Banco de dados!`);
    }
});


// -------------------------------------------- }


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

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/autenticacao', function (req, res) {
    res.render('login');
})

app.get('/usuarios', function (req, res) {
    res.render('cadastro_usuarios');
})

app.get('/administrador', function (req, res) {
    res.render('administrador')
})

app.get('/cliente', function (req, res) {
    res.render('cliente');
})

app.post('/cadastrar_usuarios', function (req, res) {

    let email = req.body.inputEmail;
    let senha = req.body.inputPassword;
    let confirme = req.body.inputConfirm;
    let adm_cliente = req.body.inputCliente;


    if (!email.trim() || !senha.trim() || !confirme.trim() || !adm_cliente) {
        console.log('Preencha todos os campos !');
        return res.render('cadastro_usuarios', { mensagem_erro: 'Por favor, Preencha todos os campos !' });
    }

    if (senha !== confirme) {
        console.log('Senhas incompativeis!');
        return res.render('cadastro_usuarios', { mensagem_erro_senha: 'Senhas Incompativeis !' });

    }


    let email_verificado = 'SELECT * FROM usuarios WHERE email = ?';
    db.get(email_verificado, [email], (err, rows) => {

        if (err) {
            console.log('Erro ao verifcar E-mail');
        }

        if (rows) {
            return res.render('cadastro_usuarios', { mensagem_erro_email: 'Já existe cadastro com esse este endereço de E-mail!' });
        }

        else {
            let query = 'INSERT INTO usuarios(email, senha, confirmar_senha, adm_cliente) VALUES (?,?,?,?)';

            db.run(query, [email, senha, confirme, adm_cliente], (err) => {
                if (!err) {
                    console.log('Cadastro feito com sucesso!');
                    return res.render('cadastro_usuarios', { mensagem_sucesso: 'Cadastro feito com sucesso!' });
                } else {
                    console.log('Erro ao cadastrar, verifque com o administrador!', err.message);
                    return res.render('cadastro_usuarios', { mensagem_erro_cadastro: 'Erro ao cadastrar, verifque com o administrador!' })
                }
            });
        }

    });
});

app.post('/login', function (req, res) {
    let email = req.body.InputEmail1;
    let senha = req.body.InputPassword1;

    let query = `SELECT * FROM usuarios WHERE email = ? AND senha = ?`;

    db.get(query, [email, senha], (err, usuarios) => {

        if (err) {
            console.log('Erro no banco de dados', err.message);
        }

        if (usuarios) {

            console.log('Bem vindo !' + usuarios.email);
        }
        let verificador = 'SELECT adm_cliente FROM usuarios WHERE email = ? ';

            db.get(verificador, [email], (err, usuarios) => {
                if(err){
                    console.log('Erro no banco de dados', err.message);
                }

                if(usuarios.adm_cliente == 'Administrador'){
                    res.redirect('/administrador');
                } 
              
                else if(usuarios.adm_cliente == 'Cliente') {
                    res.redirect('/cliente');
                   
                } else {
                    console.log('E-Mail ou senha inválidos ');
                    res.render('login');
                }   

            })
      
    })
})
// -------------------------------------------------- }




// ---- INICIANDO O SERVIDOR -- { 

app.listen(PORT, () => {
    console.log(`127.0.0.1:${PORT}`);
})
// ----------------------------}