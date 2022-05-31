import React, { useState, useEffect } from 'react';
import { ButtonGroup, StyledFormButton, StyledFormArea, Avatar, StyledTitle, colors, ExtraText, TextLink } from "./Styles";
import Logo from './../assets/logo.jpg';



function Register() {

  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [formErrors, setFormErroers] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);


  const registerUser = () => {
    const register = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      birthday: birthday,
      password: password,
      confirmationPassword: confirmationPassword
    }
    fetch("http://localhost:4000/users/register", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify(register)
    })
      .then(res => res.json())
      .then(data => {
        if (data.error === false) {
          alert(data.message)
          const redirect = () => {
            window.location = "/login"
          }
          redirect()
        } else {
          alert(data.message)
        }
      })
      .catch(err => alert(err))
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    registerUser();
   
  }
  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.first_name) {
      errors.first_name = "Required"
    }

    if (!values.last_name) {
      errors.last_name = "Required"
    }
    if (!values.email) {
      errors.email = "Required"
    } else
      if (!regex.test(values.email)) {
        errors.email = "This is not a valid email format!";
      }

    if (!values.birthday) {
      errors.birthday = "Required"
    }
    if(!values.password){
      errors.password = "Required"
    }
    if(!values.confirmationPassword){
      errors.confirmationPassword = "Required"
    }
    return errors;
  }

  return (
    <StyledFormArea>
      <Avatar image={Logo} />
      <StyledTitle color={colors.theme} size={30}>Member Sign up</StyledTitle>
      <div className='register'>
        <div className="container">
          <div className="main">
            <div className="sub-main">

              <form className="form" onSubmit={handleSubmit}>

                <div class="fontuser">
                  <label >First Name</label>
                  <input 
                  type="text"
                  placeholder="First Name"
                  value={first_name}
                  onChange={(e) => setFirstName(e.target.value)} />
                  <i class="fa fa-user fa-lg"></i>
                  <p style={{color: 'red'}}>{formErrors.first_name}</p>
                
                </div>
                <div class="fontuser">
                  <label >Last Name</label>
                  <input 
                  type="text"
                  placeholder="Last Name"
                  value={last_name}
                  onChange={(e) => setLastName(e.target.value)} />
                  <i class="fa fa-user fa-lg"></i>
                  <p style={{color: 'red'}}>{formErrors.last_name}</p>
                
                </div>
                <div class="fontuser">
                  <label>Email address</label>
                  <input
                   type="email"
                   placeholder="example@example.com"
                   value={email}
                   onChange={(e) => setEmail(e.target.value)} />
                  <i class="fa fa-envelope-open-o" aria-hidden="true"></i>
                  <p style={{color: 'red'}}>{formErrors.email}</p>
                
                </div>
                <div class="fontuser" >
                  <label >Date of Birth</label>
                  <input 
                  type="date"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)} />
                  <i class="fa fa-calendar" aria-hidden="true"></i>
                  <p style={{color: 'red'}}>{formErrors.birthday}</p>
              
                </div>
                <div class="fontuser">
                  <label >Password</label>
                  <input 
                  type="password"
                  placeholder="***"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} />
                  <i class="fa fa-key fa-lg"></i>
                  <p style={{color: 'red'}}>{formErrors.password}</p>
                
                </div>
                <div class="fontuser" >
                  <label > Confirm Password</label>
                  <input 
                  type="password" 
                  placeholder="***"
                  value={confirmationPassword}
                  onChange={(e) => setConfirmationPassword(e.target.value)}/>
                  <i class="fa fa-key fa-lg"></i>
                  <p style={{color: 'red'}}>{formErrors.confirmationPassword}</p>
                
                </div>
                <ButtonGroup>
                  <StyledFormButton type='submit'>Sign up</StyledFormButton>
                </ButtonGroup>
              </form>
              <ExtraText>
                Already have an account? <TextLink to='/login'>Login</TextLink>
              </ExtraText>
            </div>
          </div>
        </div>
      </div>
    </StyledFormArea>
  )
}
export default Register