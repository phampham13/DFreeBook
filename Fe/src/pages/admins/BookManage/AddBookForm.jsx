//import React from "react";
import classNames from "classnames/bind";
import styles from "./AddBookForm.module.scss";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import { Modal, Button } from "react-bootstrap";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { addNewBook } from "../../../features/booksSlice";
import { AddBook } from "../../../features/BookSilce";
import axios from 'axios';

const cx = classNames.bind(styles);


const AddBookForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [img1, setImg] = useState();
    const formik = useFormik({
        initialValues: {
            isbn: "",
            name: "",
            author: "",
            Cateid: "",
            publisher: "",
            img: '',
            quantityTotal: 1,
            quantityAvailabel: 0,
        },

        validationSchema: Yup.object({
            isbn: Yup.string().required("Bạn chưa thêm mã sách!"),
            name: Yup.string().required("Bạn chưa điền tên sách!"),
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


            values.img = img1;

            handleAdd(values)
        }
    });

    const [categories, setCategories] = useState([]);
    const [showCancelModal, setShowCancelModal] = useState(false);

    const handleCloseCancelModal = () => setShowCancelModal(false);
    const handleCancel = () => {
        setShowCancelModal(true);
    };

    const handleConfirmCancel = () => {
        setShowCancelModal(false);
        navigate("/admin/books");
    };
    const handleAdd = async (formValue) => {
        const { name, title, img, author, isbn, publisher, quantityTotal, quantityAvailabel, Cateid } = formValue;

        dispatch(AddBook({ name, title, img, author, isbn, publisher, quantityTotal, quantityAvailabel, Cateid }))
            .unwrap()
            .then((response) => {
                toast.success("Đăng kí thành công!!", { autoClose: 20000 });
            })
            .catch(() => {
                console.log("loi")
                toast.success("Đăng kí thành công!!", { autoClose: 2000 });
                setTimeout(() => {

                    navigate("/admin/books");
                }, 2200)
            });

    };
    useEffect(() => {
        const fetchCate = async () => {
            try {

                const response = await axios.get("http://localhost:8085/api/v1/category/getcateName");


                setCategories(response.data);

            } catch (error) {
                console.log('Error:', error);
            }
        };

        fetchCate();

    }, [])

    return (
        <div className={cx("container")}>
            <div className={cx("nav")}>
                <Link to="/admin/books" className={cx("back")}>
                    <FontAwesomeIcon icon={faArrowLeft} style={{ paddingRight: "10px" }} />
                    Quay lại thống kê
                </Link>
            </div>

            <form action="" method="POST" className={cx("form")} onSubmit={formik.handleSubmit} id={cx("form-1")}>
                <h3 className={cx("info")}>Thông tin sách</h3>

                <div className={cx("spacer")}></div>
                <div className={cx("form-body")}>
                    <div className={cx("form-group")}>
                        <div className={cx("form-input")}>
                            <label htmlFor="name" className={cx("form-label")}>
                                Mã sách<span> *</span>
                            </label>
                            <input id="isbn" name="isbn" type="text" placeholder="Mã sách" value={formik.values.id} onChange={formik.handleChange} className={cx("form-control")} />
                            {formik.errors.id && formik.touched.isbn && <span className={cx("form-message")}>{formik.errors.isbn}</span>}
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
                                Url ảnh bìa sách<span> *</span>
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
                            {/* <input id="img" name="img" type="file" placeholder="Nhập link ảnh sách" value={formik.values.img} onChange={formik.handleChange} className={cx("form-control")} /> */}
                            <div className={cx("imgArea")}>
                                {formik.values.img && (
                                    // <div>
                                    //     <img src={formik.values.img}></img>
                                    // </div>
                                    <div>
                                        <img src={URL.createObjectURL(formik.values.img)} alt="Ảnh bìa sách" />
                                    </div>
                                )}
                                {formik.errors.img && formik.touched.img && <span className={cx("form-message")}>{formik.errors.img}</span>}
                            </div>
                        </div>
                        <div className={cx("btn")}>
                            <button className={cx("cancel")} onClick={handleCancel}>
                                Hủy
                            </button>
                            <button className={cx("form-submit")} type="submit" value="Submit Form">
                                Tạo
                            </button>
                        </div>
                    </div>
                </div>
            </form >
            <Modal show={showCancelModal} onHide={handleCloseCancelModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận hủy</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn có chắc chắn muốn hủy tạo sản phẩm mới không?</Modal.Body>
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

export default AddBookForm;
