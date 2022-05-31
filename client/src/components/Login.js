import React, { useState } from "react";

import { setUserStorage } from '../utils/StorageFunctions';
import '../style/login.css';
import { useNavigate } from "react-router-dom";
import { ButtonGroup, StyledFormButton, StyledFormArea, Avatar, StyledTitle, colors, ExtraText, TextLink } from "./Styles";
import { TextInput } from "./Formlib";
import Logo from './../assets/logo.jpg';

import { FiMail, FiLock } from 'react-icons/fi';

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};


function Login(props) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});
  const navigate = useNavigate()

  function login(e) {
    e.preventDefault();
    const user = {
      email: email,
      password: password
    }
    fetch("http://localhost:4000/users/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(result => {
        alert(` ` + result.message)

        if (result.token) {

          setUserStorage(result.token, result.user);

          navigate('/dashboard')

        } else {
          navigate('/login')

        }
      }

      )
      .catch(err => alert(err))
  }


  const errors = {
    uname: "invalid username",
    pass: "invalid password"
  };

  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error" style={{ color: 'red' }}>{errorMessages.message}</div>
    );

  return (
    <StyledFormArea>
      <Avatar image={Logo} />
      <StyledTitle color={colors.theme} size={30}>Member Login</StyledTitle>
      <form onSubmit={login}>
        <label>Email</label>
        <div class="font">
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={e => setEmail(e.target.value)}
         
          />
         <i class="fa fa-envelope-open-o" aria-hidden="true"></i>
          </div>
        <br />
        <label>Password</label>
        <div class="font">
        <input type='password'
          placeholder="Password"
          name="password"
          value={password}
          onChange={e => setPassword(e.target.value)} />
           <i class="fa fa-key fa-lg"></i>
           </div>
        <ButtonGroup>
          <StyledFormButton type='submit'>Login</StyledFormButton>
        </ButtonGroup>
      </form>
      <ExtraText>
        New here? <TextLink to='/register'>Sign up</TextLink>
      </ExtraText>
    </StyledFormArea>
  )
}
export default Login;