import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Read extends Component {
  
  static propTypes = {
    books: PropTypes.array.isRequired,
    onMoveBooks: PropTypes.func.isRequired,
  }


    render() {
        return(
            <div className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
              {this.props.books.filter(book => book.shelf === 'read').map((book) => (
                <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRESpexpHi4QB2AF-vMVmCaLfqdEDNABdxyn4eefa7rf5UwAf6xoA'})`}}></div>
                    <div className="book-shelf-changer">
                    <select  onChange={(e) => this.props.onMoveBooks(book, e)}  defaultValue={book.shelf}>
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
              ))}
              </ol>
            </div>
          </div>
        )
    }
} 

export default Read