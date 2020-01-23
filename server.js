const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// router
app.get('/api/customers', (req, res) => {
    res.send([
        {
          'id': 1,
          'image': 'http://www.gorillawebmarketing.co.uk/wp-content/uploads/2014/02/a03-10-gorilla-computer-laptop-1-300x226.jpg',
          'name' : 'gorilla-kim',
          'birthday': '960322',
          'gender': 'Man',
          'job': 'Student'
        },
        {
          'id': 2,
          'image': 'http://www.gorillawebmarketing.co.uk/wp-content/uploads/2014/02/a03-10-gorilla-computer-laptop-1-300x226.jpg',
          'name' : 'gorilla-kim',
          'birthday': '960322',
          'gender': 'Man',
          'job': 'Student'
        },
        {
          'id': 3,
          'image': 'http://www.gorillawebmarketing.co.uk/wp-content/uploads/2014/02/a03-10-gorilla-computer-laptop-1-300x226.jpg',
          'name' : 'gorilla-kim',
          'birthday': '960322',
          'gender': 'Man',
          'job': 'Student'
        }   
    ]);
});

/* ====================== function code ====================== */
const serverHanlder = () =>{
    console.log(`✅  Server running at http://localhost:${port}`);
}

// Server listner
app.listen(port, serverHanlder);