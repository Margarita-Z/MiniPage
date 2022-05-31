import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { register } from "../actions/auth";
const required = (value) => {
  if (!value) {
    return (
      <div style={{color: "red"}}>
        This field is required!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const Reagistration = () => {

  const form = useRef();
  const checkBtn = useRef();
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const { message } = useSelector(state => state.message);
  const dispatch = useDispatch();

  const onChangeFirst_name = (e) => {
    const first_name = e.target.value;
    setFirstName(first_name);
  };
  const onChangeLast_name = (e) => {
    const last_name = e.target.value;
    setLastName(last_name);
  };
  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };
  const onChangeBirthday = (e) => {
    const birthday = e.target.value;
    setBirthday(birthday);
  };
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  const onChangeComfPassword = (e) => {
    const confirmationPassword = e.target.value;
    setConfirmationPassword(confirmationPassword);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setSuccessful(false);
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      dispatch(register( first_name,last_name, email, birthday, password,  confirmationPassword))
        .then(() => {
          setSuccessful(true);
        })
        .catch(() => {
          setSuccessful(false);
        });
    }
  };
    return(
        <div className="form-comp cfb">
      <h1>Create an Account!</h1>
      <Form className="sign-up-form cfb" onSubmit={handleRegister} ref={form}>
     
        <>
        <label>
          First Name:
          <br/>
          <Input
                  type="text"
                  name="first_name"
                  value={first_name}
                  onChange={onChangeFirst_name}
                  validations={[required]}
                />
        </label>
        <label>
          Last Name:
          <br/>
          <Input
                  type="text"
                  name="last_name"
                  value={last_name}
                  onChange={onChangeLast_name}
                  validations={[required]}
                />
        </label>
        <label>
          Email:
          <br/>
          <Input
                  type="text"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
                />
        </label>
        <label>
          Date od Birth:
          <br/>
          <Input
                  type="date"
                  name="birthday"
                  value={birthday}
                  onChange={onChangeBirthday}
                  validations={[required]}
                />
        </label>
        <label>
          Password:
          <br/>
          <Input
                  type="password"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required]}
                />
        </label>
        <label>
        Repeat Password:
          <br/>
          <Input
                  type="password"
                  name="password"
                  value={confirmationPassword}
                  onChange={onChangeComfPassword}
                  validations={[required]}
                />
        </label>
        <br/>
        <button>
          CreateAccount
        </button>
        </>
       
          {message && (
            <div className="form-group">
              <div className={ successful ? "alert alert-success" : "alert alert-danger" } role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
      </Form>
    </div>
    )
}
export default Reagistration;