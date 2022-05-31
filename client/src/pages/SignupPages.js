//styled components
import { StyledTextInput, StyledFormArea, StyledFormButton, StyledLabel, Avatar, StyledTitle, colors, ButtonGroup, ExtraText, TextLink, CopyrightText } from './../components/Styles';
import Logo from './../assets/logo.jpg';

//formik
import { Formik, Form } from 'formik';
import { TextInput } from '../components/Formlib';
import * as Yup from 'yup';

//icons
import { FiMail, FiLock, FiUser, FiCalendar } from 'react-icons/fi';

//auth & redux
import { connect } from 'react-redux';
import { signupUser } from '../auth/actions/userActions';
import { useNavigate } from 'react-router-dom';




const SignupPages = ({signupUser}) => {
    const navigate = useNavigate()
    return (
        <div>
            <StyledFormArea>
                <Avatar image={Logo} />
                <StyledTitle color={colors.theme} size={30}>Member Sign up</StyledTitle>
                <Formik
                    initialValues={{
                        email: "",
                        password: "",
                        repeatPassword: "",
                        dateOfBirth: "",
                        name: ""
                    }}
                    validationSchema={
                        Yup.object({
                            email: Yup.string().email('Invalid email address').required('Required'),
                            password: Yup.string().min(8, "Password is too short").max(20, 'Password id too long').required('Required'),
                            name: Yup.string().required('Required'),
                            dateOfBirth: Yup.date().required('Required'),
                            repeatPassword: Yup.string().required("Required").oneOf([Yup.ref("password")], "Passwords must match")
                        })
                    }
                    onSubmit={(values, { setSubmitting, setFieldError }) => {
                        console.log(values);
                        signupUser(values, navigate, setFieldError, setSubmitting);
                    }}
                >
                    {(isSubmitting) => (
                        <Form>
                            <TextInput
                                name='name'
                                type='text'
                                label='Full Name'
                                placeholder='Olga Simpson'
                                icon={<FiUser />}
                            />
                             <TextInput
                                name='email'
                                type='text'
                                label='Email Address'
                                placeholder='olgal@example.com'
                                icon={<FiMail />}
                            />
                             <TextInput
                                name='dateOfBirth'
                                type='date'
                                label='Date of Birth'
                               
                                icon={<FiCalendar />}
                            />
                            <TextInput
                                name='password'
                                type='password'
                                label='Password'
                                placeholder='*********'
                                icon={<FiLock />}
                            />
                             <TextInput
                                name='repeatPassword'
                                type='password'
                                label='Repeat Password'
                                placeholder='*********'
                                icon={<FiLock />}
                            />
                            <ButtonGroup>
                                <StyledFormButton type='submit'>Sign up</StyledFormButton>
                            </ButtonGroup>
                        </Form>
                    )}
                </Formik>
                <ExtraText>
                    Already have an account? <TextLink to='/login'>Login</TextLink>
                </ExtraText>
            </StyledFormArea>
            <CopyrightText>
                All right reserved &copy;2022
            </CopyrightText>
        </div>
    )
}
export default connect(null, {signupUser}) (SignupPages);