const express = require('express');
const app = express();
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 8000
const cors = require('cors');
const Auth = require('./services/auth')
const logger = require('morgan');


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

// logger to see whats going on
app.use(logger('dev'));

// before all routes, use the middleware we define in Auth to get the
// current user, or i can put it directy when requiring the controller 
app.use(Auth.authenticate);
// routes for log in and log out 
// set up base routes
app.use('/users', require('./controllers/users'));
app.use('/login', require('./controllers/sessions'));


app.use('/api', require('./controllers/restaurant.js'));

app.listen(PORT, ()=> console.log('Server listening on port ❤ 💩', PORT))

