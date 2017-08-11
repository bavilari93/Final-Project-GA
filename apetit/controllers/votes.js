
	  const router = require('express').Router();
	  const Votes = require( '../models/votes');

	  router.post('/', (req, res)=>{
	  	console.log('this is the data we are going to create', req.body)
	  	const{uservoted, user_id, restaurant_id} = req.body
	  	Votes.create(uservoted, user_id, restaurant_id)
	  		.then((data)=>{
	  			console.log(data)
	  			res.json(data);
	  		})
	  		.catch(err => console.log('votes controllers post error', err))  
	  })

	  router.get('/:restaurant/:id', (req, res)=>{
	  	let restaurant_id= req.params.restaurant;
	  	let user_id= req.params.id;
	  	console.log("this is what i received from votes", restaurant_id);
	  	console.log("this is what i recieved from votes user id",user_id);
	  	Votes.findVotedByUser(restaurant_id, user_id)
	  		.then((data)=>{
	  			console.log(data);
	  			res.json(data);
	  		})
	  		.catch(err => console.log( 'controller voter GET Error', err))
	  })

module.exports= router;



