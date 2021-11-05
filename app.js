const { urlencoded, response } = require('express');
const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const path = require('path');
const mysql = require('mysql2');

app.listen('8080', () => {
  console.log('server is running');
})

//conexão com o banco
const db = mysql.createConnection({
  host: 'localhost',
  user: //usuario,
    password: //senha,
  database: //nome do banco de dados
})

db.connect(function (err) {
  if (err) {
    console.log('Não foi possível conectar com o banco')
  }
})

//bodyparser
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyparser.json());
app.use(urlencoded({ extended: false }));
app.use(express.static('public'));


app.get('/', (req, res) => {
  let query = db.query('SELECT * FROM clientes ORDER BY nome ASC', function (err, results,) {
    res.render('index.ejs', {
      lista: results,
    });
  })
});


app.get('/registrar', (req, res) => {
  res.render('cadastro.ejs');
});

app.post('/registrar', (req, res) => {
  let nome = req.body.nome;
  let sobrenome = req.body.sobrenome;
  let idade = req.body.idade;
  let nascimento = req.body.nascimento;
  let formatData = nascimento.toString();
  let cargo = req.body.cargo;
  let email = req.body.email;
  let telefone = req.body.telefone;
  let celular = req.body.celular;
  let cpf = req.body.cpf;
  let estado_civil = req.body.estadoCivil;
  let sexo = req.body.sexo;
  let nacionalidade = req.body.nacionalidade;
  let naturalidade = req.body.naturalidade;
  let cep = req.body.cep;
  let estado = req.body.estado;
  let cidade = req.body.cidade;
  let numero = req.body.numero;
  db.query("INSERT INTO clientes (nome,sobrenome,idade,nascimento,cargo,email,telefone,celular,cpf,estado_civil,sexo,nacionalidade,naturalidade,cep,estado,cidade,numero) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [nome, sobrenome, idade, formatData, cargo, email, telefone, celular, cpf, estado_civil, sexo, nacionalidade, naturalidade, cep, estado, cidade, numero], function (err, results) {
      console.log(err);
    });
  res.render('cadastro.ejs')
});

app.post('/excluir/:id', (req, res) => {
  db.query('DELETE FROM clientes WHERE id = ?', [req.params.id], (err, results) => {
    if (!err) {
      res.send(`Funcionário matrícula: ${[req.params.id]} removido!`)
    } else {
      console.log(err)
    }
  })
})

app.get('/atualizar/:id', (req, res) => {
  let query = db.query('SELECT * FROM clientes WHERE id = ?', [req.params.id], function (err, results) {
    res.render('editar.ejs', {
      lista: results,
    });
  })
});


app.post('/atualizar/:id', (req, res) => {
  let id = req.params.id;
  let nome = req.body.nome;
  let sobrenome = req.body.sobrenome;
  let idade = req.body.idade;
  let nascimento = req.body.nascimento;
  let cargo = req.body.cargo;
  let email = req.body.email;
  let telefone = req.body.telefone;
  let celular = req.body.celular;
  let cpf = req.body.cpf;
  let estado_civil = req.body.estadoCivil;
  let sexo = req.body.sexo;
  let nacionalidade = req.body.nacionalidade;
  let naturalidade = req.body.naturalidade;
  let cep = req.body.cep;
  let estado = req.body.estado;
  let cidade = req.body.cidade;
  let numero = req.body.numero;
  db.query('UPDATE clientes SET nome = ?, sobrenome = ?, idade = ?, nascimento = ?, cargo = ?, email = ?, telefone = ?, celular = ?, cpf = ?, estado_civil = ?, sexo = ?, nacionalidade = ?, naturalidade = ?, cep = ?, estado = ?, cidade = ?, numero = ? WHERE id = ?',
    [nome, sobrenome, idade, nascimento, cargo, email, telefone, celular, cpf, estado_civil, sexo, nacionalidade, naturalidade, cep, estado, cidade, numero, id], (err, results) => {
      if (!err) {
        res.render('confirmacao.ejs', {
          id: id,
          nome: nome,
          sobrenome: sobrenome,
          idade: idade,
          nascimento: nascimento,
          cargo: cargo,
          email: email,
          telefone: telefone,
          celular: celular,
          cpf: cpf,
          estado_civil: estado_civil,
          sexo: sexo,
          nacionalidade: nacionalidade,
          naturalidade: naturalidade,
          cep: cep,
          estado: estado,
          cidade: cidade,
          numero: numero,
        })
      } else {
        console.log(err)
      }
    })
});

app.post('/search', (req, res) => {
  let search = req.body.pesquisa;
  db.query(`SELECT * FROM clientes WHERE nome LIKE '%${search}%'`,
    (err, results) => {
      res.render('busca.ejs', {
        lista: results,
      });
    })
});
