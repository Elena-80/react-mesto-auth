import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
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
        onLogin();
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
    <>
        <Header link = "/sign-up" title = "Регистрация" />


      <main>
        <div className="signin">
          <h2 className="signin__title">Вход</h2>
          <form className="signin__form" onSubmit={handleSubmit} noValidate>
            <input
              type="email"
              className="signin__input"
              placeholder="Email"
              name="email"
              value={formValue.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              className="signin__input"
              placeholder="Пароль"
              name="password"
              value={formValue.password}
              onChange={handleChange}
              required
            />
            <button rype="submit" className="signin__submit-button">
              Войти
            </button>
          </form>
        </div>
      </main>
    </>
  );
}

export default Login;