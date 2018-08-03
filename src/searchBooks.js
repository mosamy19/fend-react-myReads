import React from 'react';
import { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class SearchBooks extends Component {
  static propTypes = {
    shelves: PropTypes.array.isRequired,
    searchQuery: PropTypes.array.isRequired,
  }
  
  state = {
    query: '',
    books: [],
  }

  getSearchQuery = (query) => {
    this.props.getSearchQuery(query);
  }
  selectShelf = (book, e) => {
    let newShelf = e.target.value;
    this.props.changeShelf(book, newShelf);
  }


  render() {
    const { shelves, searchQuery } = this.props;
    let ShowingShelves = shelves;
    let ShowingSearchQuery = searchQuery;
    let thumbnail = 'imgs/default.png';
    return (

      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input id="search-input" type="text" onChange={(event) => this.getSearchQuery(event.target.value)} placeholder="Search by title or author" />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {ShowingSearchQuery.length > 0 && ShowingSearchQuery.map((book) => (


              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={book.imageLinks ? { backgroundImage: `url(${book.imageLinks.thumbnail})` } : { backgroundImage: `url( ${thumbnail} )` }}></div>
                    <div className="book-shelf-changer">
                      <select value={book.shelf ? book.shelf : "none"} onChange={(e) => this.selectShelf(book, e)}>
                        <option value="move" disabled>Move to...</option>
                        {ShowingShelves.map((shelf) => (
                          <option key={shelf.key} value={shelf.key}>{shelf.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.authors && book.authors.map((author) => (<div key={author}>{author}</div>))}</div>
                </div>
              </li>
            )

            )}
          </ol>
        </div> {/* search-books-results */}
      </div>
    )
  }
}

export default SearchBooks;
