import React from "react";
import { NavLink } from 'react-router-dom';
import styles from "./Header.module.css"

const Header = () => {
    return (
        <header className={styles.header}>
            <nav className={styles.navigation}>
                <NavLink
                    to="/home"
                    exact
                    className={({ isActive }) => isActive ? styles.navLinkActive : styles.navLink}
                >
                    Home
                </NavLink>

                <NavLink
                    to="/collection"
                    className={({ isActive }) => isActive ? styles.navLinkActive : styles.navLink}
                >
                    Collection
                </NavLink>
                <NavLink
                    to="/profile"
                    className={({ isActive }) => isActive ? styles.navLinkActive : styles.navLink}
                >
                    Profile
                </NavLink>
            </nav>
        </header>
    );
}

export default Header;