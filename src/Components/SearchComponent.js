import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class SearchComponent extends Component {
   static propTypes = {
      searchResult: PropTypes.array.isRequired,
      onMoveBooks: PropTypes.func.isRequired,
      onQuery: PropTypes.func.isRequired,
      
   }

   state = {
     query: this.props.query
   }

   _isMounted = false

   componentWillMount(){
    this._isMounted = true
   }
   componentWillUnmount(){
    this._isMounted = false
  }

  handleClick = () => {
   if(this._isMounted){
    this.props.searchResult = []
   }
  }


   handleSearchQuery = (query) => {
    if(this.props.onQuery){
      this.props.onQuery(query)
       
    }
   }


render() {
    const { query } = this.state
    const {searchResult = [], onMoveBooks} = this.props
    
    
    return (
    <div className="search-books">
    <div className="search-books-bar">
      <Link className="close-search" to="/" onClick={this.handleClick}>Close</Link>
      <div className="search-books-input-wrapper">
        {/*
          NOTES: The search from BooksAPI is limited to a particular set of search terms.
          You can find these search terms here:
          https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

          However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
          you don't find a specific author or title. Every search is limited by search terms.
        */}
       
        <input 
        type="text" 
        placeholder="Search by title or author"
        value={query}
        onChange={(e) => this.handleSearchQuery(e.target.value)}/>
      </div>
    </div>
    <div className="search-books-results">
    <ol className="books-grid">
      {(searchResult.length === 0) ?  '' : searchResult.map((book) => 
                <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRESpexpHi4QB2AF-vMVmCaLfqdEDNABdxyn4eefa7rf5UwAf6xoA'})`}}></div>
                    <div className="book-shelf-changer">
                    <select  onChange={(e) => onMoveBooks(book, e)}  defaultValue={book.shelf}>
                      <option  value="move" disabled>Move to...</option>
                      <option  value="currentlyReading">Currently Reading</option>
                      <option  value="wantToRead">Want to Read</option>
                      <option  value="read">Read</option>
                      <option  value="none">None</option>
                    </select>
                  </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.authors}</div>
                </div>
              </li>
              )}
  </ol>
  </div>
  

  </div>
    )
}
}

export default SearchComponent