import styles from "./AuthPagesStyles.module.css";

import { Link } from "react-router-dom";

import { Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";

import { useInputForm } from "Hooks/handleInput";
import { loginUser } from "Action/authorization";
import { getDataAuth } from "../../redux/Selectors";
import { paths } from "Utils/paths";
import { useAppDispatch, useAppSelector } from "../../typesData";
import { FormEvent } from "react";

export function LoginPage() {
  const dispatch = useAppDispatch();

  const { value, handleChange } = useInputForm({ email: "", password: "" });
  const { loginRequest } = useAppSelector(getDataAuth);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(loginUser({ email: value.email, password: value.password }));
  };

  return (
    <main className={styles.container}>
      <h2 className={`${styles.title} text text_type_main-medium`}>Вход</h2>
      <form className={styles.form} name={"login-page-form"} onSubmit={handleSubmit}>
        <EmailInput
          placeholder={"E-mail"}
          extraClass={styles.input}
          name="email"
          value={value.email}
          onChange={handleChange}
          // errorText={textError.email}
          // onError={isErrors.email}
          isIcon
        />
        <PasswordInput
          placeholder={"Пароль"}
          extraClass={styles.input}
          name="password"
          value={value.password || ""}
          onChange={handleChange}
        // errorText={textError.password}
        // error={isErrors.password}
        />
        <Button extraClass={styles.submitButton} type="primary" htmlType="submit" size="large">
          {!loginRequest ? "Войти" : "Отправка данных..."}
        </Button>
      </form>
      <p className={`${styles.text} text text_color_inactive text_type_main-default `}>
        Вы — новый пользователь?{" "}
        <Link className={styles.link} to={paths.register}>
          Зарегистрироваться
        </Link>
      </p>
      <p className={`${styles.text} text text_type_main-default text_color_inactive`}>
        Забыли пароль?{" "}
        <Link className={styles.link} to={paths.forgotPassword}>
          Восстановить пароль
        </Link>
      </p>
    </main>
  );
}
