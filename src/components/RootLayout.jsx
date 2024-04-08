import styles from "./RootLayout.module.css";
import { useContext, useEffect } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export function RootLayout() {
  const { user, logout } = useContext(UserContext);
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
            {user ? (
              <NavLink className={getNavClass} to="/login" onClick={logout}>
                Logout
              </NavLink>
            ) : (
              <NavLink className={getNavClass} to="/login">
                Login
              </NavLink>
            )}
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
