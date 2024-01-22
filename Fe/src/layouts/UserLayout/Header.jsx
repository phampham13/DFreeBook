import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import { Button } from "@mui/material";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { IoLibrary } from "react-icons/io5";
// import { AuthContext } from "../../contexts/AuthContex";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth";
import { useEffect } from "react";
import axios from 'axios';

const cx = classNames.bind(styles);
function Header() {

  //const { token, user } = useContext(AuthContext);
  //const listBook = useSelector((state) => state.borrowerCard.listBook)
  const us = JSON.parse(localStorage.getItem("user"))
  // const dispatch = useDispatch();
  const [name, setName] = useState([])

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await axios.get("http://localhost:8085/api/v1/category/getcateName");
        // Assuming response.data contains the user's name

        setName(response.data);
      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchUserName();
  }, []);

  let navigate = useNavigate()
  const Logout = () => {
    // dispatch(logout())
    console.log('aa ')
  }
  return (
    <div className={cx("wrapper")}>
      <div className={cx("box")}>
        <div className={cx("logo")}>
          <a href="/">
            <img src="src/layouts/UserLayout/dfreelogo.png" alt="logo" />
          </a>
        </div>
        <div className={cx("category")}>
          <div className={cx("category-item")}>
            <Link to="/">TRANG CHỦ</Link>
          </div>
          <div className={cx("category-item")}>
            <Link to="/books">
              <IoLibrary style={{ fontSize: '16px' }} />
              {"  "}
              TỦ SÁCH
            </Link>
            {/*<div className={cx("list-item")}>

                            <ul>
                                 {
                                listCategory.map((category) => (
                                    <li><Link to={category.id}>{category.name}</Link></li>
                                ))
                            } 

                                Đây là mẫu thôi, gọi api thì xóa đi
                                <li><Link to="/">Áo khoác</Link></li>
                                <li><Link to="/">Quần</Link></li>
                                <li><Link to="/">Áo </Link></li>
                            </ul>
                        </div>*/}
          </div>
          <div className={cx("category-item")}>
            <Link to="/handmadeItems">TIỆM HAND</Link>
          </div>
          <div className={cx("category-item")}>
            <Link to="/event">SỰ KIỆN  </Link>
          </div>
          <div className={cx("category-item")}>
            <Link to="/address">ĐỊA CHỈ</Link>
          </div>
        </div>
        <div className={cx("user")}>
          <div>
            <Button>
              <PersonIcon />
            </Button>
            {us ? (
              <ul style={{ width: "150px" }}>
                <li>
                  <Link to={"/"}>Lịch sử đọc</Link>
                </li>
                <li>
                  <Link to={"/"} onClick={() => {
                    localStorage.removeItem("user");
                    localStorage.removeItem("role")
                    window.location.reload()


                  }}>Đăng xuất</Link>
                  {/* <Link to={"/login"}>Đăng xuất</Link> */}
                </li>
              </ul>
            ) : (
              <ul style={{ width: "100px" }}>
                <li>
                  <Link to={"/login"}>Đăng nhập</Link>
                </li>
                <li>
                  <Link to={"/signup"}>Đăng ký</Link>
                </li>
              </ul>
            )}
          </div>
          {us ? (<div className={cx('card')}>
            <Button>
              <Link to='/borrowerCard'>
                <LibraryBooksIcon />
              </Link>
            </Button>
            {/*{us && listBook.length > 0 ? <p>{listBook.length}</p> : null}*/}
          </div>) : <div></div>}
        </div>
      </div>
    </div>
  );
}

export default Header;
