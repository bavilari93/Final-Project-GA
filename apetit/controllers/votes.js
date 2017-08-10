
	  const router = require('express').Router();
	  const User = require( '../models/votes');

	  router.post('/', (req, res)=>{
	  	res.send('this is votes')
	  })

	  routes.get('/', (req, res)=>{
	  	console.log('this is get')
	  })

module.exports= router;



