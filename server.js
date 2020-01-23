const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// router
app.get('/api/hello', (req, res) => {
    res.send({message: 'Hello express!!'});
});

/* ====================== function code ====================== */

const serverHanlder = () =>{
    console.log(`✅  Server running at http://localhost:${port}`);
}

// Server listner
app.listen(port, serverHanlder);