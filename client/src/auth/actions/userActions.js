import axios from 'axios';
import { sessionService } from 'redux-react-session';

export const loginUser = (credentials, navigate, setFieldError, setSubmitting) => {
    // make checks and get some date

    return () => {

        axios.post("", credentials, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            const { data } = response;
            if (data.status === 'FAILED') {
                const { message } = data;

                //check for specific error
                if (message.includes("credentials")) {
                    setFieldError('email', message);
                    setFieldError('password', message);
                } else if (message.includes('password')) {
                    setFieldError("password", message);
                }
            } else if (data.status === 'SUCCESS') {
                const userData = data.data[0];

                const token = userData._id;

                sessionService.saveSession(token).then(() => {
                    sessionService.saveUser(userData).then(() => {
                        navigate('/dashboard');
                    }).catch(err => console.log(err))
                }).catch(err => console.log(err))
            }
            //complete submission
            setSubmitting(false);

        }).catch(err =>
            console.log(err))
    }

}

export const signupUser = (credentials, navigate, setFieldError, setSubmitting) => {
    return (dispatch) => {
        axios.post("", credentials, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            const { data } = response;

            if (data.status === 'FAILED') {
                const { message } = data;

                //checking for specific error
                if (message.includes('name')) {
                    setFieldError("name", message);
                } else if (message.includes("email")) {
                    setFieldError("email", message)
                } else if (message.includes("date")) {
                    setFieldError("dateOfBirth", message)
                } else if (message.includes("password")) {
                    setFieldError("password", message)
                }

                //complite submission
                setSubmitting(false);

            } else if (data.status === 'SUCCESS') {
                //login user after successful signup
                const { email, password } = credentials
                dispatch(loginUser({ email, password }, navigate, setFieldError, setSubmitting))

            }

        }).catch(err => console.log(err))
    }

}

export const logoutUser = (navigate) => {
    return () => {
        sessionService.deleteSession();
        sessionService.deleteUser();
        navigate('/');
    }

}