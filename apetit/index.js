const express = require('express');
const app = express();
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 8000
const cors = require('cors');


// cross origin request 
app.use(cors());

// views engine 
app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

// body parser 
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());


app.use('/api', require('./controllers/restaurant.js'));

app.listen(PORT, ()=> console.log('Server listening on port ❤ 💩', PORT))

