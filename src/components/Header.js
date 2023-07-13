import logo from "./../images/logo.svg";
import { Link } from "react-router-dom";

function Header({location, email, onSignOut}) {

   return (
     <header className="header">
      <img className="header__logo" src={logo} alt="Логотип сайта" />
         {(location.pathname === "/sign-up") && 
            <div className = "header__item">
               <Link to = '/sign-in' className = "header__link">
                  Войти
               </Link>
            </div>
         }

         {(location.pathname === "/sign-in") && 
            <div className = "header__item">
               <Link to = '/sign-up' className="header__link">
                  Регистрация
               </Link>
            </div>
         }

         {(location.pathname === "/") && 
            <div className = "header__item">
            <div className = "header__email">{email}</div>
               <Link to = '/sign-in' className = "header__link header__link_logged" onClick = {onSignOut}>
                  Выйти
               </Link>
            </div>
         }
     </header>
   )

}


export default Header;
