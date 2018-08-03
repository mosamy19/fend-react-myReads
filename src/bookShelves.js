import React from 'react';
import { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class BookShelves extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        shelves: PropTypes.array.isRequired
    }
    selectShelf = (book, e) => {
        let newShelf = e.target.value;
        this.props.changeShelf(book, newShelf);
    }
    render() {
        const { books, shelves } = this.props;
        let ShowingShelves = shelves;
        let Showingbooks = books;
        let thumbnail = 'imgs/default.png';
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
                                                <div className="book">
                                                    <div className="book-top">
                                                        <div className="book-cover" style={book.imageLinks ? { backgroundImage: `url(${book.imageLinks.thumbnail})` } : { backgroundImage: `url( ${thumbnail} )` }}></div>
                                                        <div className="book-shelf-changer">
                                                            <select value={book.shelf} onChange={(e) => this.selectShelf(book, e)}>
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
                                </div>
                            </div>
                        ))
                        }
                    </div>
                </div>
                <div className="open-search">
                    {/* <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a> */}
                    <Link to="/search">Add a book</Link>
                </div>

            </div>
        )
    }

}

export default BookShelves;
