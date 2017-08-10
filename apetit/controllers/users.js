 // the user model is to find the user by the toke 
	  // the express to connect to a route for react with communicate with our backend 
	  // auth is to see  restric what only a subscribed user can see 
const User = require( '../models/user'), 
	  router = require('express').Router(),
	  Auth = require('../services/auth');

router.get('/validate',Auth.restrict, ( req, res)=>{
	res.json({
		name: req.user.name, 
		email: req.user.email,
		location:req.user.location, 
		token: req.user.token, 
		id: req.user.id
	})
} )


router.post('/', (req, res)=>{
	// here i define the contrains i want to pased the data
	const email = req.body.email.toLowerCase();
	const{ name, password,location, password_confirmation} = req.body;
	// input validation 
	const errors = {
		name : [],
		email:[],
		password:[],
		password_confirmation:[]
	};
	let error = false; 
	Object.keys(error).forEach(key =>{

		if(!req.body[key].split(' ').join('')){
			error[key].push(`${key.split('_').join(' ')} is required`);		
		}
	})
// this will validate and do if the password don't match 
  if(password !== password_confirmation){
    errors.password_confirmation.push("Password does not match confirmation.");
    error = true;
  }
	// make sure the email is a valid email address using regex!
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(!re.test(email)){
    errors.email.push("Not a valid email address.");
    error = true;
  }
  // if there are no errors, create the user!
  if(!error){
    User.create(name, email, location, password)
      .then(data => { // once we create the user
      	console.log(data);
        res.json(data)
      })
      .catch(err => console.log(err))
  } else { // if there are errors from our validations
    // send back a 400 (bad request) status with the errors
    res.status(400).json({errors: errors})
  }
});

module.exports = router;