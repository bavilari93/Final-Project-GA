const router      = require('express').Router();
const db = require('../db/config');


const Votes = {

findVotedByUser:(user_id)=> db.manyOrNone('SELECT restaurants.name, restaurants.restaurant_id, restaurants.location, restaurants.averagecost, restaurants.pricerange, restaurants.thunmpic, restaurants.cuisines FROM voted_restaurants, restaurants WHERE voted_restaurants.user_id=$1 AND voted_restaurants.restaurant_id= restaurants.restaurant_id;', [user_id]),

findRestaurantIdVoted:(user_id)=> db.manyOrNone('SELECT restaurant_id FROM voted_restaurants WHERE user_id=$1;', [user_id]),

findMostVoted:()=> db.manyOrNone('SELECT restaurant_id , count(restaurant_id) FROM voted_restaurants GROUP by restaurant_id;'), 

create:(uservoted, userId, restaurant_id)=>{
	return db.one(
		`INSERT INTO voted_restaurants(uservoted, user_id, restaurant_id) VALUES($1, $2, $3) returning *`, 
		[uservoted, userId, restaurant_id]
	);
	},
delete:(id,user_id) => db.none('DELETE FROM voted_restaurants WHERE restaurant_id=$1 AND user_id=$2', [id, user_id])

};


module.exports = Votes; 