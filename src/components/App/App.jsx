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

export function App() {
  // console.log("App");

  const location = useLocation();
  const background = location.state && location.state.background;
  const navigate = useNavigate();

  const handleClosePopup = () => {
    navigate(location.state.background.pathname);
  };

  return (
    <div className={styles.container}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<ProtectedRoute element={<RegisterPage />} />} />
        <Route path="/forgot-password" element={<ProtectedRoute onlyAuth={false} element={<ForgotPassword />} />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/ingredients/:id" element={<IngredientPage notPopup={true} />} />
        <Route path="/profile" element={<ProtectedRoute onlyAuth={true} element={<ProfilePage />} />}></Route>{" "}
        <Route path="/profile/orders" element={<ProtectedRoute onlyAuth={true} element={<HistoryOrdersPage />} />} />
        <Route path="/profile/orders/:number" element={<ProtectedRoute onlyAuth={true} element={<OrderView />} />} />
        {/* <Route path="/profile/orders/:number" element={<OrderView />} /> */}
        <Route path="/page-404" element={<Page404 />} />
        <Route path="/feed" element={<FeedOrdersPage />}></Route>
        <Route path="/feed/:number" element={<OrderView />} />
      </Routes>
      {background && (
        <Routes>
          <Route
            path="ingredients/:id"
            element={
              <Popup handleClosePopup={handleClosePopup}>
                <IngredientDetails />
              </Popup>
            }
          ></Route>
          <Route
            path="feed/:number"
            element={
              <Popup handleClosePopup={handleClosePopup}>
                <OrderDataFeed />
              </Popup>
            }
          ></Route>
          <Route
            path="profile/orders/:number"
            element={
              <Popup handleClosePopup={handleClosePopup}>
                <OrderDataFeed />
              </Popup>
            }
          ></Route>
        </Routes>
      )}
    </div>
  );
}
