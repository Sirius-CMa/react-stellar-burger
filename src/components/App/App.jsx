/* eslint-disable react-hooks/exhaustive-deps */

import styles from "./App.module.css";

import { AppHeader } from "Components/AppHeader";
// import { BurgerIngredients } from "Components/BurgerIngredients";
// import { BurgerConstructor } from "Components/BurgerConstructor";

// import { DndProvider } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";

import { Route, Routes } from "react-router-dom"; // Switch, useHistory, Route, useLocation

import { HomePage } from "Components/pages/HomePage";
import { LoginPage } from "AuthPages/LoginPage";
import { RegisterPage } from "AuthPages/RegisterPage";
import { ForgotPassword } from "AuthPages/ForgotPasswordPage";
import { ResetPasswordPage } from "AuthPages/ResetPasswordPage";
import { Page404 } from "Components/pages/Page404";
import { ProfilePage } from "Components/pages/ProfilePage/ProfilePage";
import { ProtectedRoute } from "Components/ProtectedRoute";

export function App() {
  // console.log("App");
  // const location = useLocation();
  // const background = location.state && location.state.background;

  return (
    <div className={styles.container}>
      <AppHeader />
      {/* <main className={styles.containerConstructor}>
        <Routes>
          <Route path="/">
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstructor />
            </DndProvider>
          </Route>
          <Route path="/login" element={<LoginPage />} exact />
        </Routes>
      </main> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<ProtectedRoute element={<RegisterPage />} />} />
        <Route path="/forgot-password" element={<ProtectedRoute onlyAuth={false} element={<ForgotPassword />} />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/ingredients/:id" element={<LoginPage />} />
        <Route path="/profile" element={<ProtectedRoute onlyAuth={true} element={<ProfilePage />} />} />
        <Route path="/page-404" element={<Page404 />} />
      </Routes>
    </div>
  );
}
