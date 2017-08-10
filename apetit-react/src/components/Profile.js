import React from 'react';

// component that renders content
// this will render when there is a valid user
const Content = (props) => {
  return(
    <div className="content">
      <h1>Welcome, {props.user.name}</h1>
      <p>Your email address is: {props.user.email}</p>
      <p>You have a cookie set to: {props.user.token}</p>
      <p> you have this id : {props.user.id}</p>
      <p> {props.longitud}</p>
      <button onClick={props.logout}>Click here to log out!</button>
    </div>
  )
}

export default Content;
