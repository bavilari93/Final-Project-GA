import React, { Component } from 'react'
import $ from 'jquery'
import axios from 'axios';
import { geolocated } from 'react-geolocated';
import RestaurantList from './restaurantlist'
import Nav from './nav'
import Search from './searchfrom'
import Restaurant from './restaurant'
import RestaurantDb from './restaurantbd'


class Restaurants extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // later I'm goint to be passing latitude , longitud and also other parameters
            restaurant: "",
            range: 2,
            data: [],
            results: [],
            saved:[],
            mode: false,
            current: false,
            url: 'http://localhost:8000/api'
        }
    }

    // Search form change 
    handleSearchChange(event) {
        this.setState({ restaurant: event.target.value });
    }

    handleRangeChange(event) {
        this.setState({ range: event.target.value })
    }
    // Search Form Submit  for API
    handleSubmit(restaurant) {
        restaurant.preventDefault()
        let params = this.state.restaurant
        let range = this.state.range
        let longitude = this.props.coords.longitude
        let latitude = this.props.coords.latitude
        $.ajax({
            url: 'https://developers.zomato.com/api/v2.1/search?',
            headers: {
                'user-key': "f8e31b39444245028c418f9de012c9a7",
                'Content-Type': 'application/json'
            },
            data: {
                q: params,
                radius: range,
                latitude: latitude,
                longitud: longitude,
                cuisines: ""
            }
        }).done((data) => {
            console.log(data)
            this.setState({ results: this.parsedResults(data['restaurants']) })
        });
    }


    getRestaurants() {
        console.log('this is happening')
        axios.get(this.state.url)
            .then(data => {
                this.setState({
                    saved: data.data,
                    mode:"restaurants"
                })
            })
    }
    // parsed result from api

    parsedResults(data) {
        return data.filter(restaurant => {
            return restaurant['restaurant'] ? true : false
        }).map(restaurant => {
            return {
                name: restaurant['restaurant'].name ? restaurant['restaurant'].name : "N/A",
                location: restaurant['restaurant'].location.address ? restaurant['restaurant'].location.address : "N/A",
                latitude: restaurant['restaurant'].location.latitude ? restaurant['restaurant'].location.latitude : 40.7317696,
                longitude: restaurant['restaurant'].location.longitude ? restaurant['restaurant'].location.longitude : -73.9841161,
                averagecost: restaurant['restaurant'].R.average_cost_for_two ? restaurant['restaurant'].R.average_cost_for_two : "N/A",
                pricerange: restaurant['restaurant'].price_range ? restaurant['restaurant'].price_range : "N/A",
                thunmpic: restaurant['restaurant'].featured_image ? restaurant['restaurant'].featured_image : "https://static.pexels.com/photos/54455/cook-food-kitchen-eat-54455.jpeg",
                cuisines: restaurant['restaurant'].cuisines ? restaurant['restaurant'].cuisines : "N/A",
                ratingcolor: restaurant['restaurant'].user_rating.rating_color ? restaurant['restaurant'].user_rating.rating_color : "N/A",
                aggregaterating: restaurant['restaurant'].user_rating.aggregate_rating ? restaurant['restaurant'].user_rating.aggregate_rating : "N/A"
            }
        })
    }
    // save restaurant from api 
    save(data) {
        console.log(data)
      
        let name = data.name
        let location = data.location
        let latitude =  data.latitude
        let longitude =  data.longitude
        let averagecost = data.averagecost
        let pricerange = data.pricerange
        let thunmpic = data.thunmpic
        let cuisines = data.cuisines
        let ratingcolor = data.ratingcolor
        let aggregaterating = data.aggregaterating
          console.log(cuisines)

        fetch(this.state.url, {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    location: location,
                    latitude: latitude,
                    longitude: longitude,
                    averagecost: averagecost,
                    pricerange: pricerange,
                    thunmpic: thunmpic,
                    cuisines: cuisines,
                    ratingcolor: ratingcolor,
                    aggregaterating: aggregaterating
                })
            })
            .then((response) => {
                console.log(response);
                return response.json()
            })
            .then((body) => {
                console.log(body)
            });
    }

    // delete data
    delete(restaurant){
        console.log(restaurant);
        axios.delete(`${this.state.url}/${restaurant.id}`)
            .then(res =>{
                this.setState(prev =>{
                    prev.saved = prev.saved.filter( s=> s.id !== restaurant.id);
                    prev.mode = "restaurants";
                    prev.current = false;
                    return prev;
                })
            })
    }

    // mode changes from navbar and when click on one restaurant

    changeMode(mode, current = false) {
        console.log('this is the mode that Im changing', mode)
        this.setState(prev => {
            prev.mode = mode;
            prev.current = current;
            return prev;
        });
    }

    // sets the move when click on one reataurant 
    setRestaurant(restaurant) {
        console.log(restaurant)
        this.setState(prev => {
            prev.current = restaurant;
            prev.mode = "restaurant"
            return prev
        })
    }

    // view controller - what and what not to display 
    renderView() {
        console.log(this.state.mode)
        if (this.state.mode === "search") {
            console.log("im inside the render of search")
            return ( 
                <div>
                <Search 
                searchValue = { this.state.restaurant } 
                changeValue = { this.handleSearchChange.bind(this) } 
                range = { this.state.range } 
                changeRange = { this.handleRangeChange.bind(this) } 
                submit = { this.handleSubmit.bind(this) }
                /> 
                 <RestaurantList 
                restaurants = { this.state.results } 
                setRestaurant = {this.setRestaurant.bind(this) } 
                button = {{
                    onClick: this.save.bind(this),
                    text:"save"
                }}
                /> 
                </div>               
            )
        }else if(this.state.mode === "restaurant") {
            console.log("im inside the render of one restaurant")
            return ( 
                <Restaurant 
                restaurant= {this.state.current}
                />
                ) 
        }else if (this.state.mode === "restaurants"){
            console.log("im inside the render of restaurants", this.state.mode)
            return (
                // this i have to pass the methods that communicate with the backend
                // use search to filter the saved info 
                <div>
                <RestaurantList 
                    restaurants = { this.state.saved } 
                    setRestaurant = { this.setRestaurant.bind(this) }
                    button = {{
                        onClick: this.delete.bind(this),
                        text:"delete"
                        }}
                        /> 
                </div >
            )
        }else{
            return ( 
            <p> loading </p>
            )
        }
    }


        // main render
        render() {

            return (

                !this.props.isGeolocationAvailable ?
                    // display input of text
                    <div > We are sorry but your browser does not support Geolocation < /div>
                    :!this.props.isGeolocationEnabled ? 
                    <div> Getting your inner foodie </div> :
                    this.props.coords ?
                    <div>
                    <Nav 
                    saved={()=>{this.getRestaurants()}}
                    changeMode = { this.changeMode.bind(this) }
                    /> 
                    {this.renderView()} 
                    </div>: 
                    <div> Retriving suggestions </div>

            )
        }
    }


    export default geolocated({
        positionOptions: {
            enableHighAccuracy: false,
        },
        userDecisionTimeout: 5000,
    })(Restaurants);