import React from 'react';
import { Grid, Segment } from 'semantic-ui-react'

// component that renders content
// this will render when there is a valid user
const Content = (props) => {
  return(
    <div className="profile">
      <Grid.Column stretched width={12}>
        <Segment>
          <h1>Welcome, {props.user.name}</h1>
          <p>Your email address is: {props.user.email}</p>
          <p>You have a cookie set to: {props.user.token}</p>
          <p> you have this id : {props.user.id}</p>
          <p> {props.longitud}</p>
          <button onClick={props.logout}>Click here to log out!</button>
        </Segment>
      </Grid.Column>
        </div>
  )
}

export default Content;
