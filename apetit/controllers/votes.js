
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

	  router.get('/:userId', (req, res)=>{
	  	console.log( 'this is the user I received', req.params.userId);
	  	const user = req.params.userId;
	  	Votes.findRestaurantIdVoted(user)
	  	.then((data)=>{
	  		res.json(data)
	  	})
	  })

	  router.delete('/:id/:user', (req,res)=>{
	  	const id = req.params.id;
	  	const userId= req.params.user;
	  	console.log('this is id in delete', id);
	  	console.log( 'this is userid in delete', userId );
	  	Votes.delete(id, userId)
	  		.then((data)=>{
	  			res.send('deleted from Data Base')
	  		})
	  		.catch(err =>{console.log('Error on delete votes', err)})
	  })

	  router.get('/2/:id', (req, res)=>{
	  	let user_id= req.params.id;
	  	console.log("this is what i received from votes", user_id);	  	console.log("this is what i recieved from votes user id",user_id);
	  	Votes.findVotedByUser(user_id)
	  		.then((data)=>{
	  			console.log(data);
	  			res.json(data);
	  		})
	  		.catch(err => console.log( 'controller voter GET Error', err))
	  })



module.exports= router;



