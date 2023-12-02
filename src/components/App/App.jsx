/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./App.module.css";

import { AppHeader } from "Components/AppHeader";

import { Route, Routes, useLocation, useNavigate } from "react-router-dom"; // Switch, useHistory, Route, useLocation

import { HomePage } from "Pages/HomePage";
import { ProfilePage } from "Pages/ProfilePage";
import { HistoryOrdersPage } from "Pages/HistoryOrdersPage";

import { IngredientPage } from "Pages/IngredientPage";
import { FeedOrdersPage } from "Pages/FeedOrdersPage";

import { Page404 } from "Pages/Page404";

import { LoginPage } from "AuthPages/LoginPage";
import { RegisterPage } from "AuthPages/RegisterPage";
import { ForgotPassword } from "AuthPages/ForgotPasswordPage";
import { ResetPasswordPage } from "AuthPages/ResetPasswordPage";

import { ProtectedRoute } from "Components/ProtectedRoute";
import { IngredientDetails } from "Components/IngredientDetails";
import { Popup } from "Components/Popup";
import { OrderDataFeed } from "Components/OrderDataFeed";
import { OrderView } from "Components/OrderView";

import { paths } from "Utils/paths";
import { ProfileForm } from "Components/ProfileForm";

export function App() {
  // console.log("App");

  const location = useLocation();
  const background = location.state && location.state.background;
  const navigate = useNavigate();

  const handleClosePopup = () => {
    navigate(location.state.background.pathname);
    // navigate(-1);
  };

  return (
    <div className={styles.container}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path={paths.home} element={<HomePage />} />
        <Route path={paths.login} element={<ProtectedRoute element={<LoginPage />} onlyNotAuth />} />
        <Route path={paths.register} element={<ProtectedRoute element={<RegisterPage />} onlyNotAuth />} />
        <Route path={paths.forgotPassword} element={<ProtectedRoute element={<ForgotPassword />} onlyNotAuth />} />
        <Route path={paths.resetPassword} element={<ProtectedRoute element={<ResetPasswordPage />} onlyNotAuth />} />
        <Route path={paths.ingredientsId} element={<IngredientPage notPopup />} />
        {""}
        <Route path={paths.profile} element={<ProtectedRoute element={<ProfilePage />} />}>
          <Route index element={<ProfileForm />} />
          <Route path={paths.profileOrders} element={<HistoryOrdersPage />} />
        </Route>
        <Route path={paths.profileOrdersNumber} element={<ProtectedRoute element={<OrderView />} />} />

        <Route path={paths.page404} element={<Page404 />} />
        <Route path={paths.feed} element={<FeedOrdersPage />}></Route>
        <Route path={paths.feedNumber} element={<OrderView />} />
      </Routes>
      {background && (
        <Routes>
          <Route
            path={paths.ingredientsId}
            element={
              <Popup handleClosePopup={handleClosePopup}>
                <IngredientDetails />
              </Popup>
            }
          ></Route>
          <Route
            path={paths.feedNumber}
            element={
              <Popup handleClosePopup={handleClosePopup}>
                <OrderDataFeed />
              </Popup>
            }
          ></Route>
          <Route
            path={paths.profileOrdersNumber}
            element={
              <Popup handleClosePopup={handleClosePopup}>
                <ProtectedRoute element={<OrderDataFeed />} />
              </Popup>
            }
          ></Route>
        </Routes>
      )}
    </div>
  );
}
