import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import './App.css'
import CurrReading from './Components/CurrReading'
import WantToRead from './Components/WantToRead'
import Read from './Components/Read'
import { Link } from 'react-router-dom';
import SearchComponent from './Components/SearchComponent'


class App extends React.Component {
 state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
   
      books: [],
      
  }

 //get data from server 
  componentDidMount(){
    BooksAPI.getAll()
    .then(books => {
      this.setState(() => ({
        books
      }))
    })
  }


  updateData = (book,shelf) => {
// Update data when shelf changes 
BooksAPI.update(book, shelf).then(()=> {
  const bookArray = this.state.books.filter(books_array => books_array !== book )
  book.shelf = shelf
  let updated_books = ""

  if(shelf === 'none'){
    updated_books = bookArray
    console.log(shelf)
  }else {
    updated_books = bookArray.concat(book)
    console.log(shelf)
  }
// update state
  if(updated_books){
    this.setState(currState => ({
      books: updated_books
    }))
  }
})

  }

// check value of shelf when changed and update state
shelf_status = (book, e) => {
  if(e.target.value === "currentlyReading" || e.target.value === "wantToRead" || e.target.value === "read" || e.target.value === "none"){
    this.updateData(book, e.target.value)
  }
}


  render() {
    return (
      <div className="app">
      <Route path="/search" render={() => (
        // add props and state to  update server/state while on search route
        <SearchComponent books={this.state.books} onMoveBooks={this.shelf_status}/>
      )}/>
      <Route exact path="/" render={() => (
          <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
            <CurrReading 
            books={this.state.books}
            onMoveBooks={this.shelf_status}
            />
            <WantToRead  
            books={this.state.books}
            onMoveBooks={this.shelf_status}/>
            <Read  
            books={this.state.books}
            onMoveBooks={this.shelf_status} />
            </div>
          </div>
          
          <div className="open-search">
        
          <Link
          // navigate to search
            to="/search"
            className="Link"
            >Add a book</Link>
          
          </div>
        </div>
      )}/>

      </div>
    )
  }
}

export default App
