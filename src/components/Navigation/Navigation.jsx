import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";

function Navigation() {
  return (
    <nav className={styles.header}>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? `${styles.active} ${styles.navLink}` : styles.navLink
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/movies"
        className={({ isActive }) =>
          isActive ? `${styles.active} ${styles.navLink}` : styles.navLink
        }
      >
        Movies
      </NavLink>
    </nav>
  );
}

export default Navigation;
