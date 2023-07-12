import React, {useState}  from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import auth from "../utils/auth";

function Register({ handleErrorMessage }) {
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
    auth.register({email: email, password: password})
      .then((res) => {
        handleErrorMessage({
           text: "Вы успешно зарегистрировались!",
           isSuccess: true,
        });
        navigate("/sign-in");
      })
      .catch((err) => {
        const text = err.message || "Что-то пошло не так! Попробуйте еще раз.";
        console.log(text)
        handleErrorMessage({
           text: text,
           isSuccess: false,
        });
      });
  }


  return (
    <>
      <Header link = "/sign-in" title = "Войти"/>
     
      <main>
        <div className="signin">
          <h2 className="signin__title">Регистрация</h2>
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
              className="sign__input"
              placeholder="Пароль"
              name="password"
              value={formValue.password}
              onChange={handleChange}
              required
            />
            <button rype="submit" className="signin__submit-button">
              Зарегистрироваться
            </button>
          </form>
          <p className="signin__text">
                Уже зарегистрированы?{" "}
            <Link className="signin__link" to="/sign-in">
              Войти
            </Link>
          </p>
        </div>
      </main>

    </>
  );
}

export default Register;