const router = require('express').Router()
Restaurant = require('../models/restaurant');

// router.post('/', (req, res)=>{
// 	res.send('hi')
// 	// console.log('connected from here', req.body); 
// 	// const {name, location, latitude, longitude, averagecost, pricerange, thunmpic, cusines, ratingcolor, aggregaterating} = req.body

router.get('/', (req, res) =>{
	Restaurant.findAll()
	.then((data)=>{
		res.json(data);
	})
	.catch(err =>console.log('CONTROLLER GET ERROR: ', err))
});


// 	// Restaurant.create(name, location, latitude, longitude, averagecost, pricerange, thunmpic, cusines, ratingcolor, aggregaterating)
// 	// .then((data)=>{
// 	// 	res.json(data);
// 	// })
// 	// .catch( err => console.log('CONTROLLER POST ERROR', err))

// })



router.delete('/:id', (req, res)=>{
console.log("this is delete")
})

module.exports = router;