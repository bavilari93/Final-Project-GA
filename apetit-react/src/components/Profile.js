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
          <p>Search your restaurants near You</p>
          <p>These are the Restaurants you have voted:</p>
        </Segment>
      </Grid.Column>
        </div>
  )
}

export default Content;
