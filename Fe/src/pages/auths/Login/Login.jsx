
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import styles from "./Login.module.scss";
import * as Yup from "yup";
import classNames from "classnames/bind";
import { login } from "../../../features/auth";
import { clearMessage } from "../../../features/message";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { toast, ToastContainer } from "react-toastify";
const cx = classNames.bind(styles);

const Login = () => {
    let navigate = useNavigate();



    const dispatch = useDispatch();

    const phoneRegExp = /^[0-9]{10,}$/;
    const formikForm = useFormik({
        initialValues: {
            phonenumber: "",
            password: "",
        },
        validationSchema: Yup.object({
            phonenumber: Yup.string().matches(phoneRegExp, "Số điện thoại không hợp lệ").required("Bạn chưa nhập số điện thoại"),
            password: Yup.string().min(6, "mật khẩu tối thiểu 6 kí tự").required("Bạn chưa nhập mật khẩu"),
        }),
        onSubmit:
            values => {
                handleLogin(values)

            }
    });
    useEffect(() => {
        dispatch(clearMessage());
    }, [dispatch]);


    const handleLogin = (formValue) => {
        const { phonenumber, password } = formValue;

        dispatch(login({ phonenumber, password }))
            .unwrap()
            .then(() => {
                const userrole = localStorage.getItem("role");

                if (userrole == '"ADMIN"') {
                    navigate("/admin/books");
                }
                else {
                    navigate("/books")
                }

                window.location.reload();
            })
            .catch(() => {
                toast.error("Sai tài khoản hoặc mật khẩu!!", { autoClose: 2000 });
            });
    };




    return (
        <div className={cx("container")}>
            <div className={cx("heading")}>
                <h3>ĐĂNG NHẬP TÀI KHOẢN</h3>
                <p>
                    Bạn chưa có tài khoản? Đăng ký <Link to={"/signup"}>tại đây</Link>
                </p>
            </div>

            <form action="" method="POST" className={cx("form")} onSubmit={formikForm.handleSubmit} id="form-2">
                <h3 className={cx("info")}>Thông tin cá nhân</h3>

                <div className="spacer"></div>

                <div className={cx("form-group")}>
                    <label htmlFor="phonenumber" className={cx("form-label")}>
                        Số điện thoại<span> *</span>
                    </label>
                    <input required id="phonenumber" name="phonenumber" type="text" placeholder="Số điện thoại" value={formikForm.values.phonenumber} onChange={formikForm.handleChange} className={cx("form-control")} />
                    {formikForm.errors.phonenumber && formikForm.touched.phonenumber && <span className={cx("form-message")}>{formikForm.errors.phonenumber}</span>}
                </div>

                <div className={cx("form-group")}>
                    <label htmlFor="password" className={cx("form-label")}>
                        Mật khẩu<span> *</span>
                    </label>
                    <input required id="password" name="password" type="password" placeholder="Mật khẩu" value={formikForm.values.password} onChange={formikForm.handleChange} className={cx("form-control")} />
                    {formikForm.errors.password && formikForm.touched.password && <span className={cx("form-message")}>{formikForm.errors.password}</span>}
                </div>
                <Link to={"/"} style={{ marginLeft: '0px' }}>Quên mật khẩu?</Link>
                <button className={cx("form-submit")} type="submit">
                    Đăng nhập
                </button>
            </form>
        </div>
    );
};

export default Login;
