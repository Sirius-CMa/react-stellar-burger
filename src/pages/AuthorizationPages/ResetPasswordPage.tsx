import styles from "./AuthPagesStyles.module.css";

// import { useDispatch, useSelector } from "react-redux";

import { Link, useNavigate } from "react-router-dom";

import { Button, PasswordInput, Input } from "@ya.praktikum/react-developer-burger-ui-components";

import { useInputForm } from "Hooks/handleInput";
import { resetPassword } from "Action/authorization";
import { getDataAuth } from "../../redux/Selectors";
import { paths } from "Utils/paths";
import { FormEvent, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../typesData";

export function ResetPasswordPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { value, handleChange, textError, isErrors } = useInputForm({ password: "", token: "" });
  const { resetPasswordRequest, resetPasswordData, isPasswordReset, failedResetPassword, isPasswordResetSuccess } = useAppSelector(getDataAuth);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(resetPassword({ token: value.token, password: value.password }));
  };

  useEffect(() => {
    if (isPasswordResetSuccess) {
      navigate(paths.login);
    }
    if (!isPasswordReset && !isPasswordResetSuccess) {
      navigate(paths.forgotPassword);
    }
    if (isPasswordReset && failedResetPassword) {
      navigate(paths.forgotPassword);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetPasswordData, isPasswordReset, failedResetPassword]);

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
          error={isErrors.token}
          icon={"EditIcon"}
        />

        <PasswordInput
          extraClass={styles.input}
          placeholder="Пароль"
          name="password"
          onChange={handleChange}
          value={value.password || ""}
        // errorText={textError.password}
        // error={isErrors.password}
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
