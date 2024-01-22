import React from "react";
import "./ModalBookDetail.scss";

const ModalBookDetail = ({ book }) => {
    return (
        <div className="book-container">
            <div className="book-info">
                <p className="book-field"><strong>Mã sách:</strong> {book.id}</p>
                <p className="book-field"><strong>Tên:</strong> {book.name}</p>
                <p className="book-field"><strong>Thể loại:</strong> {book.categoryName}</p>
                <p className="book-field"><strong>Tác giả:</strong> {book.author}</p>
                <p className="book-field"><strong>Nhà xuất bản:</strong> {book.publisher}</p>
                <p className="book-field"><strong>Tổng số lượng: </strong> {book.quantityTotal}</p>
                <p className="book-field"><strong>Sẵn có: </strong>{book.quantityAvailabel}</p>
            </div>
            <div className="book-details">
                <div className="book-item">
                    <img src={book.img} alt={book.img} className="book-image" />
                </div>
            </div>
        </div>
    )
}

export default ModalBookDetail;