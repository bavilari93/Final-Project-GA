const router      = require('express').Router();
const db = require('../db/config');


const Votes = {

findVotedByUser:(restaurantid, userid)=> db.manyOrNone(`SELECT * FROM voted_restaurants WHERE uservoted LIKE ${userid}`, [restaurantid]), 

findMostVoted:(restaurantId)=> db.manyOrNone()

}


module.exports = Votes; 