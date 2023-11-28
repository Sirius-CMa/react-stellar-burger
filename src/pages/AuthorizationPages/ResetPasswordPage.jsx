import styles from "./AuthPagesStyles.module.css";

import { useDispatch, useSelector } from "react-redux";

import { Link, useNavigate } from "react-router-dom";

import { Button, PasswordInput, Input } from "@ya.praktikum/react-developer-burger-ui-components";

import { useInputForm } from "Hooks/handleInput";
import { resetPassword } from "Action/authorization";
import { getDataAuth } from "Selectors";
import { paths } from "Utils/paths";
import { useEffect } from "react";

export function ResetPasswordPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { value, handleChange, textError, isError } = useInputForm({ password: "", token: "" });
  const { resetPasswordRequest, resetPasswordData } = useSelector(getDataAuth);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(resetPassword({ token: value.token, password: value.password }));
  };

  useEffect(() => {
    if (resetPasswordData.success) {
      navigate(paths.login);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetPasswordData]);

  return (
    <main className={styles.container}>
      <h2 className={`${styles.title} text text_type_main-medium`}>Восстановление пароля</h2>
      <form className={styles.form} name={"reset-password-page-form"} onSubmit={handleSubmit}>
        <Input
          extraClass={styles.input}
          placeholder="Токен"
          type="text"
          onChange={handleChange}
          name={"token"}
          value={value.token || ""}
          errorText={textError.token}
          error={isError.token}
          icon={"EditIcon"}
        />

        <PasswordInput
          extraClass={styles.input}
          placeholder="Пароль"
          name="password"
          onChange={handleChange}
          value={value.password || ""}
          errorText={textError.password}
          error={isError.password}
        />
        <Button extraClass={styles.submitButton} type="primary" htmlType="submit" size="large">
          {!resetPasswordRequest ? "Сбросить пароль" : "Отправка данных..."}
        </Button>
      </form>
      <p className={`${styles.text} text text_color_inactive text_type_main-default `}>
        Вспимнили пароль?{" "}
        <Link className={styles.link} to={paths.login}>
          Войти
        </Link>
      </p>
    </main>
  );
}
