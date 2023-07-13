function SignInForm({props}) {
    return  (
        <form className= "signin__form" onSubmit={props.handleSubmit} noValidate>
        <input
          type="email"
          className="signin__input"
          placeholder="Email"
          name="email"
          value={props.formValue.email}
          onChange={props.handleChange}
          required
        />
        <input
          type="password"
          className="signin__input"
          placeholder="Пароль"
          name="password"
          value={props.formValue.password}
          onChange={props.handleChange}
          required
        />
        <button type="submit" className="signin__submit-button">
          {props.buttonTitle}
        </button>
      </form>
       )
}

export default SignInForm;