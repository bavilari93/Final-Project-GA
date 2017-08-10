const router = require('express').Router()
Restaurant = require('../models/restaurant');


router.post('/', (req, res) => {
    console.log('this is post and resiving info from react', req.body);
    const { restaurant_id, name, location, latitude, longitude, averagecost, pricerange, thunmpic, cuisines, ratingcolor, aggregaterating, user_id } = req.body
    Restaurant.create(restaurant_id, name, location, latitude, longitude, averagecost, pricerange, thunmpic, cuisines, ratingcolor, aggregaterating, user_id)
        .then((data) => {
            res.json(data);
        })
        .catch(err => console.log('CONTROLLER POST ERROR', err))
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    console.log(id)
    Restaurant.findAllByUser(id)
        .then((data) => {
            res.json(data);
        })
        .catch(err => console.log('CONTROLLER GET ERROR: ', err))
});

router.delete('/:id/:user', (req, res) => {
    const id = req.params.id;
    const userId = req.params.user;
    console.log(id)
    Restaurant.delete(id, userId)
       .then((data) => {
            res.send('deleted from DB')
        })
        .catch(err => { console.log('constroller error on delete', err) 
    })
})


module.exports = router;