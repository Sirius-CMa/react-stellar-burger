import styles from "./AuthPagesStyles.module.css";

import { Link } from "react-router-dom";

import { Button, PasswordInput, Input } from "@ya.praktikum/react-developer-burger-ui-components";

import { useInputForm } from "Hooks/handleInput";

export function ResetPasswordPage() {
  const { value, handleChange, textError, isError } = useInputForm({ password: "", token: "" });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log("ForgotPassword");
  };

  return (
    <main className={styles.container}>
      <h2 className={`${styles.title} text text_type_main-medium`}>Восстановление пароля</h2>
      <form className={styles.form} name={"reset-password-page-form"} onSubmit={handleSubmit}>
        <Input
          extraClass={styles.input}
          placeholder="Токен"
          type="text"
          onChange={handleChange}
          name={"name"}
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
          Зарегистрироваться
        </Button>
      </form>
      <p className={`${styles.text} text text_color_inactive text_type_main-default `}>
        Вспимнили пароль?{" "}
        <Link className={styles.link} to="/login">
          Войти
        </Link>
      </p>
    </main>
  );
}
