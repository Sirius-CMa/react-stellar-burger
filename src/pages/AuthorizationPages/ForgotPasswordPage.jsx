import styles from "./AuthPagesStyles.module.css";

import { useDispatch, useSelector } from "react-redux";

import { Link, useNavigate } from "react-router-dom";

import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";

import { useInputForm } from "Hooks/handleInput";
import { forgotPassword } from "Action/authorization";
import { getDataAuth } from "Selectors";
import { useEffect } from "react";
import { paths } from "Utils/paths";

export function ForgotPassword() {
  const { forgotPasswordRequest, forgotPasswordData } = useSelector(getDataAuth);
  const dispatch = useDispatch();
  const { value, handleChange, textError, isError } = useInputForm({ email: "" });
  const navigate = useNavigate();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(forgotPassword({ email: value.email }));
  };

  useEffect(() => {
    if (forgotPasswordData.success) {
      navigate(paths.resetPassword);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forgotPasswordData]);

  return (
    <main className={styles.container}>
      <h2 className={`${styles.title} text text_type_main-medium`}>Восстановление пароля</h2>
      <form className={styles.form} name={"forgot-password-page-form"} onSubmit={handleSubmit}>
        <EmailInput
          extraClass={styles.input}
          placeholder="E-mail"
          name="email"
          value={value.email || ""}
          onChange={handleChange}
          errorText={textError.email}
          error={isError.email}
          icon={"EditIcon"}
        />

        <Button extraClass={styles.submitButton} type="primary" htmlType="submit" size="large">
          {!forgotPasswordRequest ? "Отправить запрос" : "Отправка запроса..."}
        </Button>
      </form>
      <p className={`${styles.text} text text_color_inactive text_type_main-default`}>
        Вспомнили пароль?{" "}
        <Link className={styles.link} to="/login">
          Войти
        </Link>
      </p>
    </main>
  );
}
//ResetPasswordPage
