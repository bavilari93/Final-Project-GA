const router      = require('express').Router();
const db = require('../db/config');

const Restaurants ={
	findAll: ()=> db.manyOrNone('SELECT * FROM restaurants'), 

	findById: (id)=>db.one(`SELECT * FROM restaurants WHERE  id= $1`, [id]), 


  create: (name, location, latitude, longitude, averagecost, pricerange, thunmpic, cuisines, ratingcolor, aggregaterating) => {
    return db.one(
  		`INSERT INTO restaurants (name, location, latitude, longitude, averagecost, pricerange, thunmpic, cuisines, ratingcolor, aggregaterating) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) returning id`,
      [name, location, latitude, longitude, averagecost, pricerange, thunmpic, cuisines, ratingcolor, aggregaterating]
  	);
  },


	delete: (id) => db.none('DELETE FROM restaurants WHERE id = $1', [id])
};


module.exports = Restaurants;