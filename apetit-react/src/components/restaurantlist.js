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
				<div className="result-info">
				<div className="content">
				<p>location: {restaurant.location}</p>
				<p>Average Cost{restaurant.averagecost}</p>
				<p>Price Range for Two{restaurant.pricerange}</p>
				<p>Cusine:{restaurant.cuisines}</p>
				</div>
				</div>
				<div
            className="button"
            onClick={()=>{this.props.button.onClick(restaurant)}}
            >{this.props.button.text}</div>
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