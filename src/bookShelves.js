import React from 'react';
import { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Book from './book';
class BookShelves extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        shelves: PropTypes.array.isRequired,
        selectShelf: PropTypes.func.isRequired
    }
    
    render() {
        const { books, shelves, selectShelf } = this.props;
        let ShowingShelves = shelves;
        let Showingbooks = books;
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {ShowingShelves.filter((shelf) => (shelf.key !== "none")).map((shelf) => (
                            <div className="bookshelf" key={shelf.key}>
                                <h2 className="bookshelf-title">{shelf.name}</h2>
                                <div className="bookshelf-books">
                                    <ol className="books-grid">
                                        {Showingbooks.filter((book) => { return book.shelf === `${shelf.key}` }).map((book) => (
                                            <li key={book.id}>
                                                <Book shelves={shelves} _Shelf={book.shelf} book={book} selectShelf={selectShelf} />
                                            </li>
                                        )

                                        )}
                                    </ol>
                                </div>
                            </div>
                        ))
                        }
                    </div>
                </div>
                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>

            </div>
        )
    }

}

export default BookShelves;
