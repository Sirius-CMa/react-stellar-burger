import styles from "./AuthPagesStyles.module.css";

import { Link } from "react-router-dom";

import { Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";

import { useInputForm } from "Hooks/handleInput";

export function LoginPage() {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log("LoginPage");
  };

  const { value, handleChange, textError, isError } = useInputForm({ email: " ", password: " " });

  return (
    <main className={styles.container}>
      <h2 className={`${styles.title} text text_type_main-medium`}>Вход</h2>
      <form className={styles.form} name={"login-page-form"} onSubmit={handleSubmit}>
        <EmailInput
          placeholder={"E-mail"}
          extraClass={styles.input}
          name="email"
          value={value.email || ""}
          onChange={handleChange}
          errorText={textError.email}
          error={isError.email}
          icon={"EditIcon"}
        />
        <PasswordInput
          placeholder={"Пароль"}
          extraClass={styles.input}
          name="password"
          value={value.password || ""}
          onChange={handleChange}
          errorText={textError.password}
          error={isError.password}
        />
        <Button extraClass={styles.submitButton} type="primary" htmlType="submit" size="large">
          Войти
        </Button>
      </form>
      <p className={`${styles.text} text text_color_inactive text_type_main-default `}>
        Вы — новый пользователь?{" "}
        <Link className={styles.link} to="/register">
          Зарегистрироваться
        </Link>
      </p>
      <p className={`${styles.text} text text_type_main-default text_color_inactive`}>
        Забыли пароль?{" "}
        <Link className={styles.link} to="/forgot-password">
          Восстановить пароль
        </Link>
      </p>
    </main>
  );
}
