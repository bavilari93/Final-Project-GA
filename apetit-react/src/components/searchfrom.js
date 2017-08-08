import React, { Component } from 'react'

class Search extends Component {

    render() {
        return (

            <
            form className = "search-restaurant"
            onSubmit = { this.props.submit.bind(this) } >
            <
            label >
            <
            input type = "text"
            name = "content"
            value = { this.props.searchValue } onChange = {
                (event) => {
                    this.props.changeValue(event)
                }
            }
            placeholder = "Search For Favorite" /
            > <
            input type = "range"
            name = "content"
            ref = "range"
            value = { this.props.range } min = "0"
            max = "11"
            onChange = {
                (e) => { this.props.changeRange(e) } }
            /> <
            /label> <
            input type = "submit"
            value = "submit" / >
            <
            /form>

        )
    }


}

export default Search;