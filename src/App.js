import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css';
import BookShelves from './bookShelves';
import { Route } from 'react-router-dom';
import SearchBooks from './searchBooks';
class BooksApp extends Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    shelves: [{
      key: "currentlyReading",
      name: "Currently Reading"
    },
    {
      key: "wantToRead",
      name: "Want to Read"
    },
    {
      key: "read",
      name: "Read"
    },
    {
      key: "none",
      name: "None"
    }
    ],
    books: [],
    searchQuery: []
  }
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    });
  }

  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      book.shelf = shelf
      this.setState(state => ({
        books: state.books
        .filter(b => b.id !== book.id)
        .concat([ book ])
      }))
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (

          <BookShelves selectShelf={(book, e) => { this.updateShelf(book, e) }} books={this.state.books} shelves={this.state.shelves} />
        )}
        />
        <Route path="/search" render={() => (
          <SearchBooks selectShelf={(book, e) => { this.updateShelf(book, e) }} books={this.state.books} shelves={this.state.shelves} />
        )} />
      </div>
    )
  }
}

export default BooksApp
