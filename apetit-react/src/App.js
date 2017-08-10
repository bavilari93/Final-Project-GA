import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Cookies from './helpers/Cookies';
import UserAuth from './components/UserAuth';
import Restaurants from './components/restaurants'
import Nav from './components/nav'
import Content from './components/Content'
class App extends Component {
    constructor() {
        super();
        this.state = {
            user: false,
            url: 'http://localhost:8000'
        }
    }

    componentDidMount() {
        this.initUser();
    }

    initUser() {
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

// options to render view 
  renderView(){
    if(this.state.mode === 'loading'){
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
      	// put this nav bar with more options 
        <Content logout={this.logout.bind(this)} user={this.state.user} />
        // <Restaurants / >
      )
    }
  }

    render() {
        return ( <div className = "App" >
        	{ this.renderView() }

            </div>
        );
    }
}

export default App;