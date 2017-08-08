import React , {Component} from 'react'

class RestaurantList extends Component { 
	renderRestaurant(){
		return this.props.restaurants.map((restaurant, index)=>{
			return(
				<div key={index} className="restaurant">
				<h2>{restaurant.name}</h2>
				<img src={restaurant.thunmPic} alt={restaurant.name}/>
				<span> </span> 
				<p>location: {restaurant.location}</p>
				<p>Average Cost{restaurant.averageCost}</p>
				<p>Price Range for Two{restaurant.priceRange}</p>
				<p>Cusine:{restaurant.cuisines}</p>
				</div>

				)
		})
	}
	// here I'm going to have the votes to sent to app and then data base 
render(){

return(

<div className="restaurant-result"> 

{this.renderRestaurant()}

</div>

	)
}

}


export default RestaurantList