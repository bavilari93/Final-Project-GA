import React , {Component} from 'react'
import { Card, Icon, Image, Button } from 'semantic-ui-react'

class RestaurantList extends Component { 
	renderRestaurant(){
		return this.props.restaurants.map((restaurant, index)=>{
			return(

			<Card key={index} className="search-info" >
				
					<Image src={restaurant.thunmpic} alt={restaurant.name}/>
					
					<h1
					 	onClick={(e) => {this.props.setRestaurant(restaurant);}}
	           			>{restaurant.name}
	           		</h1>
	           			<Card.Meta>
								Average Cost: {restaurant.averagecost}
								Price Range for Two: {restaurant.pricerange}
						</Card.Meta>
					<Card.Description>
						Cusine:  {restaurant.cuisines}
					</Card.Description>
						<Card.Meta>
						<span>location: {restaurant.location}</span>
						</Card.Meta>


					 <Card.Content extra>
					 	<div className='ui two buttons'>
							<Button 
								basic color='grey'
					            onClick={()=>{this.props.button.onClick(restaurant)}}
					            >{this.props.button.text}
					        </Button>
							<Button basic color='grey'
							// i need to pass the key of the restaurant or whole to only have the vote there
					            onClick={()=>{this.props.vote.onClick(restaurant)}}
					            >{this.props.vote.text}
				             </Button>
				         
			         </div>
			  </Card.Content>	
			</Card>
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