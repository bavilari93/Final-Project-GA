import React, { Component } from 'react'
import $ from 'jquery'
import axios from 'axios';
import { geolocated } from 'react-geolocated';
import RestaurantList from './restaurantlist'
import Nav from './nav'
import Search from './searchfrom'
import Restaurant from './restaurant'
import Votes from './votes'
import Cookies from '../helpers/Cookies';
import UserAuth from './UserAuth';
import Content from './Profile'


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
            user: false,
            url: 'http://localhost:8000',
            user_id:'',
            longitude: 2, 
            votedRestaurantId:'', 
            user_vote: [1]
        }
    }


    componentDidMount() {
        this.initUser();
    }

    // user 

     initUser() {
        console.log(this.state.user);
        // get token from cookie 
        const token = Cookies.get('token');

        if (token && token !== ''){
            axios.get(`${this.state.url}/users/validate`, {
                params: { auth_token: token}
            })
            .then(res =>{
                console.log(res)
                // change the mode here to the mode of profile 
                this.setState({user:res.data, mode: 'content' })
            })
            .catch(err =>{
                Cookies.set('token', '')
                this.setState({user:false, mode:'auth'});           
            })

        }else{
            this.setState({mode:'auth'});
        }
    }
// mthod to set up the content for only users 
    setUser(user){
        Cookies.set('token', user.token);
        this.setState({user: user, mode: 'content'})
    }
// log out method 
logout(){
    Cookies.set('token', '');
    this.setState({user:false, mode:'auth'})
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



    // parsed result from api

    parsedResults(data) {
        return data.filter(restaurant => {
            return restaurant['restaurant'] ? true : false
        }).map(restaurant => {
            return {
                restaurant_id: restaurant['restaurant'].id,
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


     getRestaurants() {
        let id = this.state.user.id
        console.log(id)
      
        axios.get(` ${this.state.url}/api/${id}`)
            .then(data => {
                console.log(data);
                this.setState({
                    saved: data.data,
                    mode:"restaurants"
                })
            })
    }

    // check if user if user is true , if true sorry you voted 
    // if false get restaurant id and check if it's the same to any 
    // in the db , if equal, just augment caunter(state)
    // if not equal save and then add vote 

    // one button will handle all of this ----


    getvotes(restid, userVoted, user_id,votedRestaurantsid){
        console.log(restid)
      
             let restaid = restid
        axios.get(`${this.state.url}/votes/${restid}/${user_id}`)
        .then(data=>{
            console.log(data);
            this.setState({votedRestaurantsid: data.restaurant_id})
            // other method to pass data to setsate 
             if(votedRestaurantsid === ""){
                console.log ('im inside the if')
                this.postVote(userVoted, user_id, restid);
            }else{
                console.log('NO!!!!!!!!!!!')
            }

            // have the set this state for votedRestaurantsid
            // then compare it to the one i got from the api
        }).catch((err)=>console.log(err))
    }


    postVote(uservoted, user_id, restid){
        console.log(uservoted, user_id, restid);
         fetch(`${this.state.url}/votes`,{
                method:'POST', 
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                 body: JSON.stringify({
                    uservoted:uservoted,
                    user_id:user_id,
                    restaurant_id:restid
                 })
            }).then((response) => {
                console.log(response);
                return response.json()
            })
            .then((body) => {
                console.log(body)
            })

    }

    // post vote 
    vote(restaurant_id){ 

        this.setState({user_vote:1})
        let user_id = this.state.user.id
          // this one comes from the api
        let restid= restaurant_id.restaurant_id
        // this one is going to be the array to update votes
        let userVoted= this.state.user_vote
        // this one updates sate from data base 
        let votedRestaurantsid= this.state.votedRestaurantsid
        console.log(restid)
        console.log(userVoted);

        // i need to see if something exist on the database to update a state
        // ?then i compare

        // first get to update the state of votedrestaurant 
        // and then compare 

// if it's equal only aument the uservoted column on the postvote,
        if( votedRestaurantsid === restid){
            this.postVote(userVoted, user_id, restid);         
        }else {
            this.getvotes(restid, userVoted, user_id, restid,votedRestaurantsid);
            // fist i have to check if a key like that exist in restaurants table 
            // if it doesn't , it will save the restaurant first in restaurants table
            // this one is going to save the vote if it doesn't exist
  
            // send the other ver too be able to use them there
           
        }   
    }


    // save restaurant from api 
    save(data) {
        console.log(data)

        let restaurant_id= data.restaurant_id
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

        fetch(`${this.state.url}/api`, {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    restaurant_id: restaurant_id, 
                    name: name,
                    location: location,
                    latitude: latitude,
                    longitude: longitude,
                    averagecost: averagecost,
                    pricerange: pricerange,
                    thunmpic: thunmpic,
                    cuisines: cuisines,
                    ratingcolor: ratingcolor,
                    aggregaterating: aggregaterating, 
                    user_id: this.state.user.id
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
        let id = this.state.user.id
        console.log(restaurant);
        console.log(id)
        axios.delete(`${this.state.url}/api/${restaurant.id}/${id}`)
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
                <Nav 
                    saved={()=>{this.getRestaurants()}}
                    changeMode = { this.changeMode.bind(this) }
                /> 
                <Search 
                    searchValue = { this.state.restaurant } 
                    changeValue = { this.handleSearchChange.bind(this) } 
                    range = { this.state.range } 
                    changeRange = { this.handleRangeChange.bind(this) } 
                    submit = { this.handleSubmit.bind(this) }/> 
                 <RestaurantList 
                    restaurants = { this.state.results } 
                    setRestaurant = {this.setRestaurant.bind(this) } 
                    button = {{
                        onClick: this.save.bind(this),
                        text:"save"
                    }}
                     vote = {{
                        onClick: this.vote.bind(this), 
                        text:"vote"
                    }}
                /> 
                </div>               
            )
        }else if(this.state.mode === "restaurant") {
            console.log("im inside the render of one restaurant")
            return ( 
                <div>
                <Nav 
                    saved={()=>{this.getRestaurants()}}
                    id={this.state.user}
                    changeMode = { this.changeMode.bind(this) }
                    /> 
                <Restaurant 
                    restaurant= {this.state.current}
                />
                </div>
                ) 
        }else if (this.state.mode === "restaurants"){
            console.log("im inside the render of restaurants", this.state.mode)
            return (
                // this i have to pass the methods that communicate with the backend
                // use search to filter the saved info 
                <div>
                <Nav 
                    saved={()=>{this.getRestaurants()}}
                    changeMode = { this.changeMode.bind(this) }
                    /> 
                <RestaurantList 
                    restaurants = { this.state.saved } 
                    setRestaurant = { this.setRestaurant.bind(this) }
                    button = {{
                        onClick: this.delete.bind(this),
                        text:"delete"
                        }}
                    vote = {{
                        onClick: this.vote.bind(this), 
                        text:"vote"
                    }}
                        /> 

                    <Votes

                    />
                   
                </div >
            )
        }else if(this.state.mode === 'loading'){
      return(
        <div className="loading">
          <img src="https://s-media-cache-ak0.pinimg.com/originals/8b/a8/ce/8ba8ce24910d7b2f4c147359a82d50ef.gif"
            alt="loading" />
        </div>
      )
    } else if(this.state.mode === 'auth') {
      return (
        <UserAuth
          setUser={this.setUser.bind(this)}
          url={this.state.url}
        />
      )
    } else {
      return (
        <div>
             <Nav 
                saved={()=>{this.getRestaurants()}}
                changeMode = { this.changeMode.bind(this) }
                logout={this.logout.bind(this)} 
            /> 
            <Content 
            logout={this.logout.bind(this)} 
            user={this.state.user} 
            longitud= {this.props.coords.longitude}
            />

            <Votes/>
        </div>
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