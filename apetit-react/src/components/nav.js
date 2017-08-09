import React from 'react';

const Nav = (props) => {
  return(
    <nav>
      <div onClick={()=>{props.saved()}}>All Restaurants</div>
      <div onClick={()=>{props.changeMode('search')}}>Search</div>
    </nav>
  )
}

export default Nav;