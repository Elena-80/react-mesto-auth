import logo from "./../images/logo.svg";
import { Link } from "react-router-dom";

function Header({link, title, email, onClick}) {

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип сайта" />
      {/* {email && 
        (<div className = "header__item">
          <div className = "header__email">{email}</div>
          <Link to = {link} className="header__link" onClick = {onClick}>
              {title}
          </Link>
        </div>
      )} */}

    <div className = "header__item">
        <div className = "header__email">{email ? email : ''}</div>
       
        <Link to = {link} className={`header__link` + (email ? " header__link_logged" : "")} onClick = {onClick}>
            {title}
        </Link>
    </div>
    

    </header>
  );

}


export default Header;
