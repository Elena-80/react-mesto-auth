import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import SignInForm from "./SignInForm";
import auth from "../utils/auth.js";

function Login({ handleErrorMessage, onLogin }) {
  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  })


  const navigate = useNavigate();

  function handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    setFormValue((state) => ({ ...state, [name]: value }));
  }


  function handleSubmit(event) {
    event.preventDefault();
    const { email, password } = formValue;
    auth.authorize({email: email, password: password})
      .then(res => {
        if (res.token) localStorage.setItem('token', res.token);
          onLogin(email);
          navigate('/', {replace: true});
      })
      .catch((err) => {
        const text = err.message || "Что-то пошло не так! Попробуйте еще раз";
        handleErrorMessage({
           text: text,
           isSuccess: false,
         });
      });
  }



  return (
  
      <main>
        <div className="signin">
          <h2 className="signin__title">Вход</h2>

          <SignInForm props={{
          formValue: formValue,
          buttonTitle: 'Войти',
          handleSubmit: handleSubmit,
          handleChange: handleChange,
          children: (
            <>
            </>
          ),
        }}/>
        
        </div>
      </main>
   
  );
}

export default Login;