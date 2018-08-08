import React from 'react';
import { Component } from 'react';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom';
import Book from './book';

class SearchBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    shelves: PropTypes.array.isRequired,
    selectShelf: PropTypes.func.isRequired
    }
  
  state = {
    searchQuery: [],
  }

  selectShelf = (book, e) => {
    let newShelf = e.target.value;
    this.props.changeShelf(book, newShelf);
  }

  SearchQuery = (query) => {
    let message = document.querySelector(".msg");
    message.innerHTML = '';
    if (query.trim() && query.length) {
      BooksAPI.search(query).then((query) => {
        if (query.length > 0) {
          this.setState({ searchQuery: query })
            message.innerHTML = `We Found ${query.length} results!`;
        } else {
          this.setState({ searchQuery: [] })
          message.innerHTML = `No results found, please use another term. :(`;
        }
      })
    }
    else if (query.trim() === '') {
      this.setState({ searchQuery: [] })
      message.innerHTML = `Write Something. :)`;
    }
  }

  render() {
    const { shelves, selectShelf, books } = this.props;
    let ShowingSearchQuery = this.state.searchQuery;
    return (

      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input id="search-input" type="text" onChange={(event) => this.SearchQuery(event.target.value)} placeholder="Search by title or author" />
          </div>
        </div>
        
        <div className="search-books-results">
        <div className="msg">
        </div>
          <ol className="books-grid">
          
            {ShowingSearchQuery.length > 0 && ShowingSearchQuery.map((queryBook) => {
            let shelf = 'none';
              books.map((book)=> {
                book.id === queryBook.id ? shelf = book.shelf : ''
              })

              return (
                <li key={queryBook.id}>
                <Book book={queryBook} shelves={shelves} _Shelf={shelf} selectShelf={selectShelf} />
              </li>
              )
            }

            )
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks;
