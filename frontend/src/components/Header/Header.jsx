import Reac, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../images/Vector.svg";
import options from "../../images/options.svg";
import closeIcon from "../../images/close-icon.png";

function Header({ userEmail, loggedIn, onSignOut }) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      <header className={menuOpen ? "header__mobile" : "header"}>
        <div className="header__container">
          <img className="header__logo" src={logo} alt="logotipo" />

          {loggedIn ? (
            <>
              <div className="header__user-info header__user-info--desktop">
                <p className="header__email">{userEmail}</p>
                <button className="header__logout" onClick={onSignOut}>
                  Sair
                </button>
              </div>

              <button
                className="header__options-btn"
                onClick={toggleMenu}
                aria-label="Abrir menu"
              >
                <img
                  src={menuOpen ? closeIcon : options}
                  alt="menu"
                  className="header__options-icon"
                />
              </button>
            </>
          ) : (
            <div className="header__auth-links">
              {location.pathname === "/signin" && (
                <Link to="/signup" className="header__link">
                  Cadastre-se
                </Link>
              )}
              {location.pathname === "/signup" && (
                <Link to="/signin" className="header__link">
                  Entrar
                </Link>
              )}
            </div>
          )}
        </div>

        {loggedIn && menuOpen && (
          <div className="header__user-info header__mobile-menu">
            <p className="header__email">{userEmail}</p>
            <button className="header__logout" onClick={onSignOut}>
              Sair
            </button>
          </div>
        )}
      </header>

      {/* <hr className="header__line" /> */}
    </>
  );
}

export default Header;
