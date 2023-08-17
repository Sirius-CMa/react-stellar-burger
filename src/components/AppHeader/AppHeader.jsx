import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import styles from "./AppHeader.module.css";

function Header() {
  return (
    <div className={`${styles.container} `}>
      <nav className={`${styles.nav}  `}>
        <ul className={styles.wrapperList}>
          <li className={styles.navItem}>
            <ul className={styles.wrapperList}>
              <li className={`${styles.navItem}`}>
                <BurgerIcon type="secondary" />
                <p className={`${styles.text} text text_type_main-default`}>Конструктор</p>
              </li>
              <li className={`${styles.navItem} `}>
                <ListIcon type="secondary" />
                <p className={`${styles.text} text text_type_main-default `}>Лента заказов</p>
              </li>
            </ul>
          </li>

          <li className={`${styles.navItem} ${styles.navItem_center} `}>
            <Logo />
          </li>
          <li className={`${styles.navItem} mr-20`}>
            <ProfileIcon type="secondary" />
            <p className={`${styles.text} text text_type_main-default`}>Личный кабинет</p>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
