import React, { Component } from 'react';
import axios from 'axios';

// component for sign up
class SignUp extends Component {
  constructor(){
    super();
    this.state = { 
      inputs: {
        name: '',
        email: '',
        location:'',
        password: '',
        password_confirmation: ''
      }
    }
  }

  // method to sign up
  signUp(e){
    console.log(this.state.inputs)
    e.preventDefault(); 
    axios.post(`${this.props.url}/users`, this.state.inputs)
      .then(res => { 
        console.log(res.data)
        this.props.setUser(res.data);
      })
  }

  // method to change one of the inputs
  changeInput(e, input){
    console.log(e.target.value)
    const val = e.target.value;
    this.setState(prev => { 
      prev.inputs[input] = val;
      return prev;
    });
  }

  render(){
    return(
      <div className="auth-form">
        <h1>Sign Up</h1>
        <form onSubmit={this.signUp.bind(this)}>

          <label htmlFor='email'>Name</label>
          <input value={this.state.inputs.name}
            id='name' name='name' type='text'
            onChange={e => this.changeInput(e, 'name')}
          />

          <label htmlFor='email'>Email</label>
          <input value={this.state.inputs.email}
            id='email' name='email' type='email'
            onChange={e => this.changeInput(e, 'email')}
          />

           <label htmlFor='location'>Location</label>
          <input value={this.state.inputs.location}
            id='location' name='location' type='text'
            onChange={e => this.changeInput(e, 'location')}
          />

          <label htmlFor='password'>Password</label>
          <input value={this.state.inputs.password}
            id='password' name='password' type='password'
            onChange={e => this.changeInput(e, 'password')}
          />

          <label htmlFor='password_confirmation'>Password Confirmation</label>
          <input value={this.state.inputs.password_confirmation}
            id='password_confirmation'
            name='password_confirmation' type='password'
            onChange={e => this.changeInput(e, 'password_confirmation')}
          />

          <div className="form-buttons">
            <button type="submit" className="form-button">Sign Up</button>
            <button onClick={this.props.toggleMode} className="form-button">Log In</button>
          </div>

        </form>
      </div>
    )
  }
}

export default SignUp;
