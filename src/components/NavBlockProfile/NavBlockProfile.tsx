import styles from "./NavBlockProfile.module.css";

import { useLocation, NavLink } from "react-router-dom";
// import { useDispatch } from "react-redux";

import { logoutUser } from "Action/authorization";
import { PROFILE_FEED_CLEAN } from "Action/wsProfileFeed";
import { useAppDispatch } from "../../typesData";

export function NavBlockProfile() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const pageLocation = location.pathname;

  const onLogOut = () => {
    dispatch(logoutUser());
    dispatch({ type: PROFILE_FEED_CLEAN });
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.navBlock}`}>
        <NavLink to="/profile" className={pageLocation !== "/profile" ? styles.link : styles.link_active}>
          Профиль
        </NavLink>
        <NavLink to="/profile/orders" className={pageLocation !== "/profile/orders" ? styles.link : styles.link_active}>
          История заказов
        </NavLink>
        <NavLink to="/login" className={styles.link} onClick={onLogOut}>
          Выход
        </NavLink>
        <p className={"text text_type_main-default text_color_inactive mt-20"}>В этом разделе вы можете изменить свои персональные данные</p>
      </div>
    </div>
  );
}
