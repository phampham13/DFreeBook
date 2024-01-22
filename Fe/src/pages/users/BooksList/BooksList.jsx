import classNames from "classnames/bind";
import styles from "./BooksList.module.scss";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { fetchBooks, selectAllBooks, selectBookIds, selectBookById, searchBook } from "../../../features/booksSlice";
import { getAllBook } from "../../../features/BookSilce";
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";

const cx = classNames.bind(styles);



const BooksList = () => {
    const dispatch = useDispatch()
    const [books, setBooks] = useState([])
    const [originalBooks, setOriginalBooks] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("Tất cả");
    const [keyword, setKeyword] = useState('')
    const [categories, setCategories] = useState([])
    const navigate = useNavigate();


    useEffect(() => {
        const fetchUserName = async () => {
            try {
                const response = await axios.get("http://localhost:8085/api/v1/category/getcateName");
                setCategories(response.data);

            } catch (error) {
                console.log('Error:', error);
            }
        };

        fetchUserName();

    }, [])

    useEffect(() => {

        dispatch(getAllBook({}))
            .unwrap()
            .then((response) => {
                setOriginalBooks(response)
                setBooks(response)

            })
            .catch(() => {
                console.log("loi")
            })
    }, [dispatch])

    const handleCategoryChange = (event) => {
        const category = event.target.value
        if (category) {
            const filter = originalBooks.filter((book) => {
                return book.categoryName[0] === category
            })
            setBooks(filter)
        } else {
            setBooks(originalBooks)
        }
        setSelectedCategory(category);
    };


    function handleSearch(e) {
        if (keyword.trim()) {
            const filter = originalBooks.filter((book) => {
                return book.name.toLowerCase().includes(keyword.toLowerCase()) || book.author.toLowerCase().includes(keyword.toLowerCase())
            })
            setBooks(filter)
            setSelectedCategory("")
        } else {
            toast.error("Bạn chưa nhập từ khóa")
        }
    }

    const redirectToOtherPage = (bookId) => {
        navigate(`/bookDetail/${bookId}`);
    };

    const renderedBooks = books.map(book => (
        <div className={cx('book')} key={book.id} onClick={() => redirectToOtherPage(book.id)}>
            <div className={cx('cover')}>
                <img src={book.img} alt="Bìa sách"></img>
                <span>Mượn sách</span>
            </div>
            <div className={cx("info")}>
                <h5 className={cx('name')}>{book.name}</h5>
                <p>Tác giả: {book.author}</p>
                <p>Tổng số lượng: {book.quantityTotal}</p>
                <p>Sẵn có: <span>{book.quantityAvailabel}</span></p>
            </div>
        </div>
    ))

    return (
        <div className={cx('wrapper')}>
            <h3>Tủ sách của Dfree</h3>
            <div className={cx('search-bar')}>
                <select value={selectedCategory} onChange={handleCategoryChange}>
                    <option value="">Tất cả loại</option>
                    {categories.map((category) => (
                        <option key={category.name} value={category.name}>
                            {category.name}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    className={cx('search-input')}
                    placeholder="Tìm kiếm theo tên sách hoặc tác giả"

                    onChange={e => setKeyword(e.target.value)}
                />
                <button className={cx('search-button')} onClick={handleSearch}>Tìm Kiếm</button>
            </div>
            <div className={cx('book-container')}>{renderedBooks}</div>
        </div>
    )
}

export default BooksList