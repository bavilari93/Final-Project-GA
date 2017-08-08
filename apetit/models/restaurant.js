const router      = require('express').Router();
const db = require('../db/config');

const Restaurants ={
	findAll: ()=> db.manyOrNone('SELECT * FROM restaurants'), 

	findById: (id)=>ndb.one(`SELECT * FROM restaurants WHERE  id= $1`, [id]), 

	create: (name, location, latitude, longitude, averagecost, pricerange, thunmpic, cusines, ratingcolor, aggregaterating) =>{
		return db.one(
			`INSERT INTO restaurants(name, location, latitude, longitude, averagecost, pricerange, thunmpic, cusines, ratingcolor, aggregaterating) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) return id`,
			[name, location, latitude, longitude, averagecost, pricerange, thunmpic, cusines, ratingcolor, aggregaterating]

			);
	}, 

	delete: (id)=>{ db.none('DELETE FROM restaurants WHERE  id= $1', [id])}
};


module.exports = Restaurants;