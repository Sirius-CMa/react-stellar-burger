/* eslint-disable jsx-a11y/anchor-is-valid */
import styles from "./AppHeader.module.css";

import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";

export function AppHeader() {
  return (
    <header className={`${styles.header} `}>
      <nav className={`${styles.navBlock}  `}>
        <ul className={styles.navBlock__wrapperList}>
          <li className={`${styles.navBlock__navItem}`}>
            <a href="#" className={`${styles.navBlock__link}`}>
              <BurgerIcon type="secondary" />
              <p className={`${styles.text} text text_type_main-default ml-2`}>Конструктор</p>
            </a>
          </li>
          <li className={`${styles.navBlock__navItem} `}>
            <a href="#" className={`${styles.navBlock__link}`}>
              <ListIcon type="secondary" />
              <p className={`${styles.text} text text_type_main-default ml-2`}>Лента заказов</p>
            </a>
          </li>
        </ul>

        <div className={`${styles.header__logo}  `}>
          <Logo />
        </div>
        <div className={`${styles.navBlock__navItem}`}>
          <a href="#" className={`${styles.navBlock__link}`}>
            <ProfileIcon type="secondary" />
            <p className={`${styles.text} text text_type_main-default ml-2`}>Личный кабинет</p>
          </a>
        </div>
      </nav>
    </header>
  );
}
