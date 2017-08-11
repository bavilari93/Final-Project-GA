const router      = require('express').Router();
const db = require('../db/config');


const Votes = {

findVotedByUser:(restaurant_id, user_id)=> db.one('SELECT*FROM voted_restaurants, restaurants  WHERE restaurants.restaurant_id=$1 AND voted_restaurants.user_id=$2', [restaurant_id, user_id]),

// ('SELECT * FROM voted_restaurants, restaurants WHERE restaurant_id=$1 AND user_id=$2', [restaurant_id, user_id]), 

// findMostVoted:(restaurantId)=> db.manyOrNone()

create:(uservoted, userId, restaurant_id)=>{
	return db.one(
		`INSERT INTO voted_restaurants(uservoted, user_id, restaurant_id) VALUES($1, $2, $3) returning *`, 
		[uservoted, userId, restaurant_id]
	);
	}

}


module.exports = Votes; 