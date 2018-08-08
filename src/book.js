import React from 'react';
import { Component } from 'react';
import PropTypes from 'prop-types'



class Book extends Component {

    static propTypes = {
        book: PropTypes.object.isRequired, 
        _Shelf: PropTypes.string.isRequired,
        selectShelf : PropTypes.func.isRequired,
        shelves: PropTypes.array.isRequired
    
    }

    render() {
        const {book, shelves, _Shelf, selectShelf} = this.props;
        let thumbnail = 'imgs/default.png';
        return (
            <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={book.imageLinks ? { backgroundImage: `url(${book.imageLinks.thumbnail})` } : { backgroundImage: `url( ${thumbnail} )` }}></div>
                    <div className="book-shelf-changer">
                      <select  onChange={(e) => selectShelf(book, e.target.value)} value={_Shelf}>
                        <option value="move" disabled>Move to...</option>
                        {shelves.map((shelf) => (
                          <option key={shelf.key} value={shelf.key}>{shelf.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.authors && book.authors.map((author) => (<div key={author}>{author}</div>))}</div>
                </div>
        )
    }
}
export default Book;