const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "acl1996",
  database: "cadastro",
});

app.use(express.json());
app.use(cors());

app.post("/register", (req, res) => {
  const { nome, email, nascimento, profissao, observacao } = req.body;

  let mysql = "INSERT INTO cliente ( nome, email, nascimento, profissao, observacao) VALUES (?, ?, ?, ?, ?)";
  db.query(mysql, [nome, email, nascimento, profissao, observacao], (err, result) => {
    res.send(result);
  });
});

app.post("/search", (req, res) => {
  const { nome, email, profissao } = req.body;

  let mysql =
    "SELECT * from cliente WHERE nome = ? AND email = ? AND profissao = ?";
  db.query(mysql, [nome, email, profissao], (err, result) => {
    if (err) res.send(err);
    res.send(result);
  });
});

app.get("/getClients", (req, res) => {
  let mysql = "SELECT * FROM cliente";
  db.query(mysql, (err, result) => {
    if (err) {
      console.log(err);
      res.send(err);
       eturn;
    } else {
      res.send(result);
    }
  });
});

app.put("/edit", (req, res) => {
  const { id, nome, email, nascimento, profissao, observacao } = req.body;
  let mysql = "UPDATE cliente SET nome = ?, email = ?, nascimento = ?, profissao = ?, observacao = ?   WHERE id = ?";
  db.query(mysql, [nome, email, nascimento, profissao, observacao, id], (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  let mysql = "DELETE FROM cliente WHERE id = ?";
  db.query(mysql, id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("rodando na porta 3001");
});
