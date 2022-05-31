import React, {useState} from 'react'
//styled components
import { StyledFormArea, StyledFormButton, Avatar, StyledTitle, colors, ButtonGroup, ExtraText, TextLink, CopyrightText } from './../components/Styles';
import Logo from './../assets/logo.jpg';

//formik
import { Formik, Form } from 'formik';
import { TextInput } from '../components/Formlib';
import * as Yup from 'yup';

//icons
import { FiMail, FiLock } from 'react-icons/fi';

import { setUserStorage } from '../utils/StorageFunctions';
import { useNavigate } from 'react-router-dom';




const LoginPage = () => {
    let navigate = useNavigate();
   
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onChangeUsername = (e) => {
        const email = e.target.value;
        setEmail(email);
      };
      const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
      };


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
            .catch(err => console.log(err))
    }

    return (
        <div>
            <StyledFormArea>
                <Avatar image={Logo} />
                <StyledTitle color={colors.theme} size={30}>Member Login</StyledTitle>
                <Formik
                   
                  
                  
                >
                   
                        <form   onSubmit={{login}}>
                            <TextInput
                                name='email'
                                type='text'
                                label='Email Address'
                                placeholder='olgal@example.com'
                                value={email}
                                onChange={onChangeUsername}
                                icon={<FiMail />}
                            />
                            <TextInput
                                name='password'
                                type='password'
                                label='Password'
                                placeholder='*********'
                                value={password}
                                onChange={onChangePassword}
                                icon={<FiLock />}
                            />
                            <ButtonGroup>
                                <StyledFormButton type='submit'>Login</StyledFormButton>
                            </ButtonGroup>
                        </form>
                   
                </Formik>
                <ExtraText>
                    New here? <TextLink to='/signup'>Sign up</TextLink>
                </ExtraText>
            </StyledFormArea>
            <CopyrightText>
                All right reserved &copy;2022
            </CopyrightText>
        </div>
    )
}
export default  LoginPage;