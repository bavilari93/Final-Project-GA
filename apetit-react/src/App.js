import React, { Component } from 'react';
import './App.css';
import Restaurants from './components/restaurants'
import Nav from './components/nav'
import RestaurantDb from './components/restaurantbd'
class App extends Component {
  render() {
    return (
      <div className="App">
        <Restaurants/>
        <RestaurantDb/>
      </div>
    );
  }
}

export default App;
