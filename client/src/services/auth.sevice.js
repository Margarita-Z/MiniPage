//Authentication service
import axios from 'axios';

const register = ( first_name,last_name, email, birthday, password,  confirmationPassword) => {
  return axios.post("http://localhost:4000/users/register", {
    first_name,
    last_name, 
    email, 
    birthday, 
    password,  
    confirmationPassword
  })
 
};
const login = (email, password) => {
  return axios
    .post("http://localhost:4000/users/login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};
const logout = () => {
  localStorage.removeItem("user");
};
export default {
  register,
  login,
  logout,
};