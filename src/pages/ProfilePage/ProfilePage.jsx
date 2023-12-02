import styles from "./ProfilePage.module.css";

import { NavBlockProfile } from "Components/NavBlockProfile";
import { Outlet } from "react-router-dom";

export function ProfilePage() {
  return (
    <div className={`${styles.container}`}>
      <NavBlockProfile />
      <Outlet />
    </div>
  );
}
