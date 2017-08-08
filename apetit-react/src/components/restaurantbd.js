import React , {Component} from 'react'
import $ from 'jquery'

class RestaurantDb extends Component{
	constructor(){
		super();
		this.state ={
			restaurant: [],
			url: 'http://localhost:8000/api'
		}
	}

	ComponentDidMount(){
		$.ajax({
			url:'http://localhost:8000/api'
		}).done((data)=>{
			console.log(data)
			this.setState({restaurant: data})
		})
	}
	render(){
		return(

			<div> RestaurantDb</div>


			)
	}
}

export default RestaurantDb