import React from 'react'

const Restaurant = ( props)=>{
	console.log(props)
	return(

		<div className="restaurant">
				<h2>{props.restaurant.name}</h2>
				<img src={props.restaurant.thunmpic} alt={props.restaurant.name}/>
				<span> </span> 
				<div className="result-info">
				<p>location: {props.restaurant.location}</p>
				<p>Average Cost{props.restaurant.averagecost}</p>
				<p>Price Range for Two{props.restaurant.pricerange}</p>
				<p>Cusine:{props.restaurant.cuisines}</p>
				</div>
				</div>

		)
}

export default Restaurant;