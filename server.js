const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// database
const data = fs.readFileSync('./database.json')
const conf = JSON.parse(data);
const mysql = require("mysql");

const connection =  mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database
});
connection.connect();

// router
app.get('/api/customers', (req, res) => {
  connection.query(
    "SELECT * FROM CUSTOMER",
    (err, rows, fields) => {
      res.send(rows);
    }
  );
});

/* ====================== function code ====================== */
const serverHanlder = () =>{
    console.log(`✅  Server running at http://localhost:${port}`);
}

// Server listner
app.listen(port, serverHanlder);