const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/image', express.static('./uploads'));

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
try {
  console.log(`⚡  DB connected`)
  connection.connect();
} catch (error) {
  console.log(`❌  DB connection error ::`, error)
}


// multer
const upload = multer({
  storage: multer.diskStorage({
      destination(req, file, cb){
          cb(null, 'uploads/')
     },
      filename(req, file, cb){
          // 확장자 추출
          const ext = path.extname(file.originalname);
          // 이름설정 (basename:확장자제외 파일명) + 현재시간 + 확장자
          cb(null, path.basename(file.originalname, ext) + new Date().valueOf() + ext);
     },
 }),
  limit: { fileSize: 5 * 1024 * 1024},
});

// router
app.get('/api/customers', (req, res) => {
  connection.query(
    "SELECT * FROM CUSTOMER",
    (err, rows, fields) => {
      res.send(rows);
    }
  );
});
app.post('/api/customers', upload.single('image'), (req, res) => {
  console.log(`=============`,req.file);
  let sql = 'INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, ?, ?)';
  let image = '/image/' + req.file.filename;
  let name = req.body.name;
  let birthday = req.body.birthday;
  let gender = req.body.gender;
  let job = req.body.job;
  let params = [image, name, birthday, gender, job];
  connection.query(sql, params,
      (req, rows, fields) => {
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