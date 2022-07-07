import { NavLink } from 'react-router-dom';
import { useAuthCtx } from '../../store/authContext';
import css from './Header.module.css';

function Header() {
  const { isUserLoggedIn, logout } = useAuthCtx();

  return (
    <header className={css.header}>
      <div className={css.img}>
        <img className={css.logo} src="logo1.png" alt="Logo" />
      </div>

      <nav className={css.nav}>
        {isUserLoggedIn && (
          <NavLink className="nav-link" to="/home">
            Home
          </NavLink>
        )}
        {isUserLoggedIn && (
          <NavLink className="nav-link" to="/add">
            Add
          </NavLink>
        )}

        {!isUserLoggedIn && (
          <NavLink className="nav-link" to="/register">
            Register
          </NavLink>
        )}
        {!isUserLoggedIn && (
          <NavLink className="nav-link" to="/login">
            Login
          </NavLink>
        )}

        {isUserLoggedIn && (
          <NavLink onClick={logout} className="nav-link" to="/login">
            Logout
          </NavLink>
        )}
      </nav>
    </header>
  );
}

export default Header;
