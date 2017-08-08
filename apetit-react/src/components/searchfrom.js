import React from 'react'

const Search = (props) =>{
		return(

			<
            form className = "search-restaurant"
            onSubmit = { this.handleSubmit.bind(this) } >
            <
            label >
            <
            input type = "text"
            name = "content"
            value = { props.valueparam} 
            onChange = { (event) => {
			props.changeParam(event)}}
            /> <
            input type = "range"
            name = "content"
            ref="range"
            value = { props.range } 
            min = "0"
		    max = "11"
            onChange = {(e) => {props.rangeChange(e)}}
            />
            <
            /label> <
            input type = "submit"
            value = "submit" / >
            <
            /form>

			)
	}

export default Search;