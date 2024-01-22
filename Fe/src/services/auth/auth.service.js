import axios from "axios";

const API_URL = "http://localhost:8085/api/v1/auth/";

const register = (fullname, phonenumber, email, password) => {
  return axios.post(API_URL + "register", {
    fullname,
    phonenumber,
    email,
    password,
  });
};

const login = (phonenumber, password) => {
  return axios
    .post(API_URL + "authenticate", {
      phonenumber,
      password,
    })
    .then((response) => {
      if (response.data.access_token) {
        localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem("role", JSON.stringify(response.data.role))
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("role");

};

const authService = {
  register,
  login,
  logout,
};

export default authService;