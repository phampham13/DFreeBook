//import React from "react";
import classNames from "classnames/bind";
import styles from "./EditBookForm.module.scss";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import { Modal, Button } from "react-bootstrap";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
//import { addNewBook, selectBookById, fetchBooks, editBook } from "../../../features/booksSlice";
import axios from "axios";
import { updateBook } from "../../../features/BookSilce";

const cx = classNames.bind(styles);


const EditBookForm = () => {
    const { id } = useParams()
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const [categories, setCategories] = useState([]);
    const [book, setBook] = useState([]);
    const [image, setImg] = useState();
    const [check, setCheck] = useState(false);



    const [showCancelModal, setShowCancelModal] = useState(false);
    //const [formData, setFormData] = useState({})

    //useEffect(() => {
    //    dispatch(fetchBooks());
    //}, [dispatch]);


    useEffect(() => {
        const fetchData = async () => {
            try {


                const response = await axios.get(`http://localhost:8085/api/v1/book/getdetail?id=` + id);

                setBook(response.data);
                return () => { controller }

            } catch (error) {
                console.log('Error:', error);
            }
        };

        fetchData();
    }, []);
    useEffect(() => {
        const fetchUserName = async () => {
            try {

                const response = await axios.get("http://localhost:8085/api/v1/category/getcateName");

                setImg(book.img)
                setCategories(response.data);

            } catch (error) {
                console.log('Error:', error);
            }
        };

        fetchUserName();

    }, [])




    const formik = useFormik({
        enableReinitialize: true,
        initialValues: book,

        validationSchema: Yup.object({
            id: Yup.string().required("Bạn chưa thêm mã sách!"),
            name: Yup.string().required("Bạn chưa điền tên sách!"),
            title: Yup.string().required("Bạn chưa điền tên sách!"),
            author: Yup.string().required("Bạn chưa nhập giá cho sản phẩm"),
            publisher: Yup.string().required("Hãy thêm nhà xuất bản!"),
            Cateid: Yup.string().required("Bạn chưa thêm danh mục cho sản phẩm"),
            img: Yup.string().required("Bạn chưa thêm ảnh bìa cho sách"),
            quantityTotal: Yup.number().integer("Số lượng phải là số nguyên").min(1, "Tổng sách không nhỏ hơn 1").required("Nhập tổng số lượng sách"),
            quantityAvailabel: Yup.number().integer("Số lượng phải là số nguyên").min(0, "Số lượng không âm").required("Nhập số lượng sách sẵn có")
                .test('is-less-or-equal', 'Số lượng sẵn có phải nhỏ hơn hoặc bằng tổng số lượng', function (value) {
                    const { quantityTotal } = this.parent; // Lấy giá trị của quantityTotal từ object cha
                    return value <= quantityTotal;
                }),
        }),

        onSubmit: (values) => {
            console.log("cập nhật")
            values.img = image
            values.title = 'update';
            console.log(values)
            handleUpdate(values);


        }
    });

    const handleUpdate = async (formValue) => {
        const { id, name, title, img, author, isbn, publisher, quantityTotal, quantityAvailabel, Cateid } = formValue;

        dispatch(updateBook({ id, name, title, img, author, isbn, publisher, quantityTotal, quantityAvailabel, Cateid }))
            .unwrap()
            .then(() => {
                toast.success("Cập nhậtthành công!!", { autoClose: 2000 });
            })
            .catch(() => {
                console.log("loi")
                toast.success("Cập nhật thành công!!", { autoClose: 2000 });
                setTimeout(() => {

                    navigate("/admin/books");
                }, 2200)
            });
    }
    const handleCloseCancelModal = () => setShowCancelModal(false);
    const handleCancel = () => {
        setShowCancelModal(true);
    };

    const handleConfirmCancel = () => {
        setShowCancelModal(false);
        navigate("/admin/books");
    };

    return (
        <div className={cx("container")}>
            <div className={cx("nav")}>
                <Link to="/admin/books" className={cx("back")}>
                    <FontAwesomeIcon icon={faArrowLeft} style={{ paddingRight: "10px" }} />
                    Quay lại thống kê
                </Link>
            </div>

            <form action="" method="POST" className={cx("form")} onSubmit={formik.handleSubmit} id={cx("form-1")}>
                <h3 className={cx("info")}>Chỉnh sửa thông tin sách</h3>

                <div className={cx("spacer")}></div>
                <div className={cx("form-body")}>
                    <div className={cx("form-group")}>
                        <div className={cx("form-input")}>
                            <label htmlFor="id" className={cx("form-label")}>
                                Mã sách<span> *</span>
                            </label>
                            <input id="id" name="id" type="text" placeholder="Mã sách" value={formik.values.id} disabled className={cx("form-control")} />
                            {formik.errors.id && formik.touched.id && <span className={cx("form-message")}>{formik.errors.id}</span>}
                        </div>
                        <div className={cx("form-input")}>
                            <label htmlFor="name" className={cx("form-label")}>
                                Tên sách<span> *</span>
                            </label>
                            <input id="name" name="name" type="text" placeholder="nhập tên sách" value={formik.values.name} onChange={formik.handleChange} className={cx("form-control")} />
                            {formik.errors.name && formik.touched.name && <span className={cx("form-message")}>{formik.errors.name}</span>}
                        </div>
                        <div className={cx("form-input")}>
                            <label htmlFor="author" className={cx("form-label")}>
                                Tác giả<span> *</span>
                            </label>
                            <input id="author" name="author" type="text" placeholder="nhập tác giả" value={formik.values.author} onChange={formik.handleChange} className={cx("form-control")} />
                            {formik.errors.author && formik.touched.author && <span className={cx("form-message")}>{formik.errors.author}</span>}
                        </div>

                        <div className={cx("form-input")}>
                            <label htmlFor="publisher" className={cx("form-label")}>
                                Nhà xuất bản<span> *</span>
                            </label>
                            <input id="publisher" name="publisher" type="text" placeholder="nhập nxb" value={formik.values.publisher} onChange={formik.handleChange} className={cx("form-control")} />
                            {formik.errors.publisher && formik.touched.publisher && <span className={cx("form-message")}>{formik.errors.publisher}</span>}
                        </div>

                        <div className={cx("form-input")}>
                            <label htmlFor="Cateid" className={cx("form-label")}>
                                Thể loại:<span> * &nbsp;</span>
                            </label>
                            <select id={cx("Cateid")} name="Cateid" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.Cateid || ""}>
                                <option>Chọn thể loại</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                            {formik.errors.Cateid && formik.touched.Cateid && (
                                <span className={cx("form-message")}>
                                    <br></br>
                                    {formik.errors.Cateid}
                                </span>
                            )}
                        </div>
                        <div className={cx("form-input")} id={cx("quantityTotal")}>
                            <label htmlFor="quantityTotal" className={cx("form-label")}>
                                Tổng số lượng sách<span> *</span>
                            </label>
                            <input id="quantityTotal" name="quantityTotal" type="number" placeholder="nhập số lượng" value={formik.values.quantityTotal} onChange={formik.handleChange} className={cx("form-control")} />
                            {formik.errors.quantityTotal && formik.touched.quantityTotal && <span className={cx("form-message")}>{formik.errors.quantityTotal}</span>}
                        </div>
                        <div className={cx("form-input")} id={cx("quantityAvailabel")}>
                            <label htmlFor="quantityAvailabel" className={cx("form-label")}>
                                Số lượng sách sẵn có<span> *</span>
                            </label>
                            <input id="quantityAvailabel" name="quantityAvailabel" type="number" placeholder="nhập số lượng" value={formik.values.quantityAvailabel} onChange={formik.handleChange} className={cx("form-control")} />
                            {formik.errors.quantityAvailabel && formik.touched.quantityAvailabel && <span className={cx("form-message")}>{formik.errors.quantityAvailabel}</span>}
                        </div>
                    </div>

                    <div className={cx("form-group")}>
                        <div className={cx("form-input")}>
                            <label htmlFor="img" className={cx("form-label")}>
                                Chọn file ảnh cập nhật<span> *</span>
                            </label>
                            <input
                                id="img"
                                name="img"
                                type="file"
                                accept="image/*"
                                onChange={(event) => {
                                    formik.setFieldValue("img", event.currentTarget.files[0]);
                                    setImg(event.currentTarget.files[0])
                                    // Hiển thị trước ảnh
                                    setCheck(true)
                                    const reader = new FileReader();

                                    reader.onload = (e) => {
                                        const imgArea = document.getElementById("imgArea");
                                        // Xóa nội dung cũ
                                        const img = document.createElement("img");
                                        img.src = e.target.result;



                                    };
                                    reader.readAsDataURL(event.currentTarget.files[0]);
                                }}
                                className={cx("form-control")}
                            />
                            {formik.values.img && check == false && (


                                <input id="img" name="img" type="text" placeholder="Nhập link ảnh sách" value={formik.values.img} onChange={formik.handleChange} className={cx("form-control")} />

                            )}
                            {check && (


                                <input id="img" name="img" type="text" placeholder="Nhập link ảnh sách" value={image.name} className={cx("form-control")} />

                            )}
                            <p>Ảnh bìa sách</p>
                            <div className={cx("imgArea")}>
                                {formik.values.img && !check && (
                                    <div>
                                        <img src={formik.values.img} ></img>
                                    </div>


                                )}
                                {check && (


                                    <div>
                                        <img src={URL.createObjectURL(image)} alt="Ảnh bìa sách" />
                                    </div>
                                )}
                                {formik.errors.img && formik.touched.img && <span className={cx("form-message")}>{formik.errors.img}</span>}
                            </div>
                        </div>
                        <div className={cx("btn")}>
                            <div className={cx("cancel")} onClick={handleCancel}>
                                Hủy
                            </div>
                            <button className={cx("form-submit")} type="submit" value="Submit Form">
                                Cập nhật
                            </button>
                        </div>
                    </div>
                </div>
            </form >
            <Modal show={showCancelModal} onHide={handleCloseCancelModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận hủy</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn có chắc chắn muốn hủy chỉnh sửa thông tin sách không?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className={cx("btn-close-modal")} style={{ backgroundColor: "#36a2eb" }} onClick={handleCloseCancelModal}>
                        Đóng
                    </Button>
                    <Button variant="danger" onClick={handleConfirmCancel}>
                        Hủy
                    </Button>
                </Modal.Footer>
            </Modal>
        </div >
    );
};

export default EditBookForm;
