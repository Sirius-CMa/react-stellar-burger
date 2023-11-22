/* eslint-disable jsx-a11y/anchor-is-valid */
import styles from "./AppHeader.module.css";

import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";

import { useLocation, NavLink } from "react-router-dom";

export function AppHeader() {
  const location = useLocation();
  const pageLocation = location.pathname;

  return (
    <header className={`${styles.header} `}>
      <nav className={`${styles.navBlock}  `}>
        <div className={styles.navBlock__wrapperList}>
          <NavLink to="/" exact={true} className={styles.link}>
            <BurgerIcon type={pageLocation === "/" ? "primary" : "secondary"} />
            <span className={pageLocation === "/" ? styles.linkText_active : styles.linkText}>Конструктор</span>
          </NavLink>
          <NavLink to="/feed" exact={true} className={styles.link}>
            <ListIcon type={pageLocation === "/feed" ? "primary" : "secondary"} />
            <span className={pageLocation === "/feed" ? styles.linkText_active : styles.linkText}>Лента заказов</span>
          </NavLink>
        </div>

        <div className={`${styles.header__logo}  `}>
          <Logo />
        </div>

        <NavLink to="/profile" exact={true} className={styles.link}>
          <ProfileIcon type={pageLocation === "/profile" ? "primary" : "secondary"} />
          <span className={pageLocation === "/profile" ? styles.linkText_active : styles.linkText}>Личный кабинет</span>
        </NavLink>
      </nav>
    </header>
  );
}
