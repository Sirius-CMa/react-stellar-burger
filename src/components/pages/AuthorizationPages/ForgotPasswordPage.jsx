import styles from "./AuthPagesStyles.module.css";

import { Link } from "react-router-dom";

import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";

import { useInputForm } from "Hooks/handleInput";

export function ForgotPassword() {
  const { value, handleChange, textError, isError } = useInputForm({ password: "" });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log("ForgotPassword");
  };

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
          Зарегистрироваться
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
