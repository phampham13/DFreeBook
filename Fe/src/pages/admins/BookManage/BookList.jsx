import classNames from "classnames/bind";
import styles from "./BookList.module.scss";
import DataTable from "react-data-table-component";
import Select from "react-select";
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import customStyles from "./CustomTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ModalBookDetail from "./ModalBookDetail";
import { fetchBooks, selectAllBooks, selectBookIds, selectBookById, searchBook, deleteBook } from "../../../features/booksSlice";
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import { getAllBook } from "../../../features/BookSilce";

const cx = classNames.bind(styles);


const BookList = () => {
    const columns = [
        {
            name: "Mã",
            selector: (row) => row.isbn,
            sortable: true,
            color: "#007bff",
            width: '7%'
        },
        {
            name: "Tên sách",
            selector: (row) => row.name,
            sortable: true,
            wrap: true,
            width: '25%',
            style: {
                fontWeight: '500',
            }
        },
        {
            name: "Thể loại",
            selector: (row) => row.categoryName,
            sortable: true,
            width: '15%'
        },
        {
            name: "Tổng số lượng",
            selector: (row) => row.quantityTotal,
            sortable: true,
            width: '15%',
            center: 'true'
        },
        {
            name: "Sẵn có",
            selector: (row) => row.quantityAvailabel,
            sortable: true,
            width: '15%',
            center: 'true'
        },
        {
            name: "Ảnh",
            cell: (row) => <img src={row.img} alt={row.img} className={cx("image-cell")} />,
            width: '13%'
        },
        {
            name: "",
            cell: (row) => (<div className={cx('editIcon')}>
                <Link to={`/admin/editBook/${row.id}`}>
                    <FontAwesomeIcon icon={faEdit} onClick={() => handleEdit(row)} />
                </Link>
            </div>),
            width: '5%'
        },
        {
            name: "",
            cell: (row) =>
                <FontAwesomeIcon icon={faTrashAlt} style={{ color: 'red', cursor: "pointer" }} onClick={() => confirmDelete(row)} />,
            width: '5%'
        },
    ];



    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedRow, setSelectedRow] = useState({})
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [keyword, setKeyword] = useState('')
    const [showModal, setShowModal] = useState(false);
    const [originalBooks, setOriginalBooks] = useState([]);
    const [books, setBooks] = useState([])

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
                //console.log(response)
                setOriginalBooks(response)
                setBooks(response)
            })
            .catch(() => {
                console.log("loi")
            })
    }, [dispatch])
    const handleCloseDeleteModal = () => setShowDeleteModal(false);
    const confirmDelete = (book) => {
        setSelectedRow(book)
        setShowDeleteModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };
    //const navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchBooks())
    }, [dispatch])

    const handleClickBook = (book) => {
        setSelectedRow(book)
        setShowModal(true)
    };

    function handleSearch() {
        if (keyword) {
            const filter = originalBooks.filter((book) => {
                return book.name.toLowerCase().includes(keyword.toLowerCase()) || book.author.toLowerCase().includes(keyword.toLowerCase())
            })
            setBooks(filter)
            setSelectedCategory("")
        }
        else {
            toast.error("Vui lòng nhập từ khóa")
        }
    }

    const handleCategoryChange = (e) => {
        const category = e.target.value
        if (category) {
            const filter = originalBooks.filter((book) => {
                return book.categoryName[0] === category
            })
            setBooks(filter)
        } else {
            setBooks(originalBooks)
        }
        setSelectedCategory(category)
    };

    const handleDelete = async () => {

        const response = await axios.post(`http://localhost:8085/api/v1/book/deleteBook?id=` + selectedRow.id);
        toast.success('Xóa sách thành công', { autoClose: 2000 })

        setTimeout(() => {

            window.location.reload();
        }, 2100)
        setShowDeleteModal(false)

        return () => { controller }
    }


    return (
        <div className={cx("wrap")}>
            <div className={cx("topBar")}>
                <Link to="/admin/addBook" className={cx("create-btn")}>
                    Thêm sách
                </Link>
            </div>

            <div className={cx("search-element")}>
                <select value={selectedCategory} onChange={handleCategoryChange}>
                    <option value="">Tất cả loại</option>
                    {categories &&
                        categories.map((category) => (
                            <option key={category.id} value={category.name}>
                                {category.name}
                            </option>
                        ))}
                </select>
                <div className={cx("search-bar")}>
                    <input
                        type="text"
                        className={cx('search-box')}
                        placeholder="Tìm kiếm theo tên sản phẩm"

                        onChange={e => setKeyword(e.target.value)}
                    />
                    <button className={cx('search-btn')} onClick={handleSearch}>
                        <FontAwesomeIcon icon={faSearch} style={{ color: 'white', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
                    </button>
                </div>
            </div>

            <div className={cx("table")}>
                <DataTable className={cx('rdt_Table')}
                    columns={columns}
                    data={books}
                    //selectableRows
                    onRowClicked={(row) => {
                        handleClickBook(row);
                    }}
                    fixedHeader
                    pagination
                    customStyles={customStyles}
                ></DataTable>
            </div>
            <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận hủy</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn chắc chắn muốn xóa sách{selectedRow.name}?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className={cx("btn-close-modal")} style={{ backgroundColor: "#36a2eb" }} onClick={handleCloseDeleteModal}>
                        Hủy
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Xóa
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showModal} onHide={handleCloseModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Chi tiết sách</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ModalBookDetail book={selectedRow} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className={cx("btn-close-modal")} style={{ backgroundColor: "#36a2eb" }} onClick={handleCloseModal}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default BookList;
