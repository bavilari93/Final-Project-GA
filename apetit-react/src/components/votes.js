import React, { Component } from 'react'
import RestaurantList from './restaurantlist'

class Votes extends Component{

	constructor(props){
		super(props)
		this.state = { 
			restaurantLongitude: 2,
			restaurantLatitude: 2, 
			api_id: 2, 
			user_id: "",
			length_update: 2,
			uservoted: false		
		}
	}

	// i have to check if the restaurant id already exixt , if not save it in the data base 
	// if it exist 
	// check if user has voted for that one 
	// if not add vote 



// method to check if the latitude and latitude is near to the restaurant in the database 

// method to update the number of users that has click on that 

// method to get the array of user from data base and check if contains my user and which one containes more votes with a method >

	render(){
		return(
			<div> 

			




			< /div> 




			)
	}
}


export default Votes