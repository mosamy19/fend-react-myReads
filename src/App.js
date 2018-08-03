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
    books: [],
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
    searchQuery: []
  }
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books });
    });
  }
  componentWillReceiveProps(props) {
    console.log(props);
  }
  SearchQuery(query) {
    if (query.trim() && query.length) {
      BooksAPI.search(query).then((query) => {
        if (query.length > 0) {
          this.setState({ searchQuery: query })
          console.log(this.state.searchQuery);
        } else {
          this.setState({ searchQuery: [] })
        }
      })
    }
    else if (query.trim() === '') {
      this.setState({ searchQuery: [] })
    }
  }
  updateShelf(bo, she) {
    let _book = bo;
    _book.shelf = she;
    this.setState({ [_book.shelf]: she });
    BooksAPI.update(bo, she)
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (

          <BookShelves changeShelf={(book, e) => { this.updateShelf(book, e) }} books={this.state.books} shelves={this.state.shelves} />
        )}
        />
        <Route path="/search" render={() => (
          <SearchBooks changeShelf={(book, e) => { this.updateShelf(book, e) }} getSearchQuery={(query) => { this.SearchQuery(query) }} searchQuery={this.state.searchQuery} shelves={this.state.shelves} />
        )} />
      </div>
    )
  }
}

export default BooksApp
