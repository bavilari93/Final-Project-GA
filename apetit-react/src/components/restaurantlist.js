import React , {Component} from 'react'

class RestaurantList extends Component { 
	renderRestaurant(){
		return this.props.restaurants.map((restaurant, index)=>{
			return(
				<div key={index} className="restaurant">
				<h2
				 onClick={(e) => {
              this.props.setRestaurant(restaurant);
            }}
            >{restaurant.name}</h2>
				<img src={restaurant.thunmpic} alt={restaurant.name}/>
				<span> </span> 
				<p>location: {restaurant.location}</p>
				<p>Average Cost{restaurant.averagecost}</p>
				<p>Price Range for Two{restaurant.pricerange}</p>
				<p>Cusine:{restaurant.cuisines}</p>
				<div
            className="button"
            onClick={()=>{this.props.button.onClick(restaurant)}}
            ><p>{this.props.button.text}</p></div>



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