import styles from "./RootLayout.module.css";
import { Outlet, NavLink } from "react-router-dom";

export function RootLayout() {
  const getNavClass = ({ isActive }) => (isActive ? styles["nav-active"] : undefined);
  return (
    <>
      <nav>
        <ul>
          <li title="Home">
            <NavLink className={getNavClass} to="/">
              Home
            </NavLink>
          </li>
          <li title="Login">
            <NavLink className={getNavClass} to="/login">
              Login
            </NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
      <footer>
        <p>&copy; 2024 - falkking soft</p>
      </footer>
    </>
  );
}
