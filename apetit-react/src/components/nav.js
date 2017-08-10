import React from 'react';

const Nav = (props) => {
	// have soem logic here to when to display what on the nav bar 
  return(
    <nav>
      <div onClick={()=>{props.saved()}}>All Restaurants</div>
      <div onClick={()=>{props.changeMode('search')}}>Search</div>
      <div onClick={()=>{props.changeMode('content')}}>Profile</div>
      <div onClick={props.logout}>Log Out</div>


      {props.logout}
    </nav>
  )
}

export default Nav;