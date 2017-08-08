import React, { Component } from 'react'
import $ from 'jquery'
import { geolocated } from 'react-geolocated';
import RestaurantList from './restaurantlist'
import Nav from './nav'
import Search from './searchfrom'
import Restaurant from './restaurant'


class Restaurants extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // later I'm goint to be passing latitude , longitud and also other parameters
            restaurant: "",
            range: 2,
            data: [],
            results: [],
            mode: false,
            current: false
        }
    }
    handleSearchChange(event) {
        this.setState({ restaurant: event.target.value });
    }

    handleRangeChange(event) {
        this.setState({ range: event.target.value })
    }

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
            console.log(this.state.results.length)
        });
    }

    parsedResults(data) {
        return data.filter(restaurant => {
            return restaurant['restaurant'] ? true : false
        }).map(restaurant => {
            return {
                name: restaurant['restaurant'].name ? restaurant['restaurant'].name : "N/A",
                location: restaurant['restaurant'].location.address ? restaurant['restaurant'].location.address : "N/A",
                latitude: restaurant['restaurant'].location.latitude ? restaurant['restaurant'].location.latitude : "N/A",
                longitude: restaurant['restaurant'].location.longitud ? restaurant['restaurant'].location.longitud : "N/A",
                averageCost: restaurant['restaurant'].R.average_cost_for_two ? restaurant['restaurant'].R.average_cost_for_two : "N/A",
                priceRange: restaurant['restaurant'].price_range ? restaurant['restaurant'].price_range : "N/A",
                thunmPic: restaurant['restaurant'].featured_image ? restaurant['restaurant'].featured_image : "https://static.pexels.com/photos/54455/cook-food-kitchen-eat-54455.jpeg",
                cuisines: restaurant['restaurant'].cuisines ? restaurant['restaurant'].cuisines : "N/A",
                rating_color: restaurant['restaurant'].user_rating.rating_color ? restaurant['restaurant'].user_rating.rating_color : "N/A",
                aggregate_rating: restaurant['restaurant'].user_rating.aggregate_rating ? restaurant['restaurant'].user_rating.aggregate_rating : "N/A"
            }
        })

    }

    changeMode(mode, current = false) {
        console.log('this is the mode that Im changing', mode)
        this.setState(prev => {
            prev.mode = mode;
            prev.current = current;
            return prev;
        });
    }


    renderRestaurants() {
        if (this.state.results.length > 0) {
            return ( <
                RestaurantList restaurants = { this.state.results }
                />
            )
        } else { console.log("error") }
    }


    renderView() {
        console.log(this.state.mode)
        if (this.state.mode === "restaurants") {
            console.log("im inside the render of restaurants")
            return (
                // this i have to pass the methods that communicate with the backend
                <
                Search searchValue = { this.state.restaurant } changeValue = { this.handleSearchChange.bind(this) } range = { this.state.range } changeRange = { this.handleRangeChange.bind(this) } submit = { this.handleSubmit.bind(this) }
                />

            )
        } else if (this.state.mode === "search") {
            console.log("im inside the render of search")
            return ( <
                div >
                <
                Search searchValue = { this.state.restaurant } changeValue = { this.handleSearchChange.bind(this) } range = { this.state.range } changeRange = { this.handleRangeChange.bind(this) } submit = { this.handleSubmit.bind(this) }
                /> <
                RestaurantList restaurants = { this.state.results }
                /> 

                { this.renderRestaurants()}

                <
                /div>

               
            )
        } else if (this.state.mode === "restaurant") {
            console.log("im inside the render of one restaurant")
            return ( < Restaurant / > )
        } else {
            return ( <
                p > loading < /p>
            )
        }
    }

    

    render() {

        return (!this.props.isGeolocationAvailable ?
            // display input of text
            <
            div > We are sorry but your browser does not support Geolocation < /div> :!this.props.isGeolocationEnabled ? <
            div > Getting your inner foodie < /div> :
            this.props.coords ?
            <
            div >
            <
            Nav changeMode = { this.changeMode.bind(this) }
            />

            { this.renderView() }



            <
            /div> : <
            div > Retriving suggestions < /div>

        )
    }
}


export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(Restaurants);