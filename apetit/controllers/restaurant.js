const router = require('express').Router()
Restaurant = require('../models/restaurant');


router.post('/', (req, res)=>{
	console.log('this is post and resiving info from react', req.body);
	const {name, location, latitude, longitude, averagecost, pricerange, thunmpic, cuisines, ratingcolor, aggregaterating} = req.body
Restaurant.create(name, location, latitude, longitude, averagecost, pricerange, thunmpic, cuisines, ratingcolor, aggregaterating)
	.then((data)=>{
		res.json(data);
	})
	.catch( err => console.log('CONTROLLER POST ERROR', err))
})

router.get('/', (req, res) =>{
	Restaurant.findAll()
	.then((data)=>{
		res.json(data);
	})
	.catch(err =>console.log('CONTROLLER GET ERROR: ', err))
});

router.delete('/:id', (req, res)=>{
console.log("this is delete")
})

module.exports = router;