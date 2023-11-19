import styles from "./AuthPagesStyles.module.css";

import { Link } from "react-router-dom";

import { Button, EmailInput, PasswordInput, Input } from "@ya.praktikum/react-developer-burger-ui-components";

import { useInputForm } from "Hooks/handleInput";

export function RegisterPage() {
  const { value, handleChange, textError, isError } = useInputForm({ name: " ", email: " ", password: " " });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log("RegisterPage");
  };

  return (
    <main className={styles.container}>
      <h2 className={`${styles.title} text text_type_main-medium`}>Регистрация</h2>
      <form className={styles.form} name={"register-page-form"} onSubmit={handleSubmit}>
        <Input
          extraClass={styles.input}
          placeholder="Имя"
          type="text"
          minLength="2"
          maxLength="30"
          onChange={handleChange}
          name={"name"}
          value={value.name || ""}
          errorText={textError.name}
          error={isError.name}
          icon={"EditIcon"}
          // required
        />
        <EmailInput
          extraClass={styles.input}
          placeholder="E-mail"
          name="email"
          value={value.email || ""}
          onChange={handleChange}
          errorText={textError.email}
          error={isError.email}
          icon={"EditIcon"}
          // required
        />
        <PasswordInput
          extraClass={styles.input}
          placeholder="Пароль"
          name="password"
          onChange={handleChange}
          value={value.password || ""}
          errorText={textError.password}
          error={isError.password}
          // required
        />
        <Button extraClass={styles.submitButton} type="primary" htmlType="submit" size="large">
          Зарегистрироваться
        </Button>
      </form>
      <p className={`${styles.text} text text_color_inactive text_type_main-default `}>
        Уже зарегистрированы?{" "}
        <Link className={styles.link} to="/login">
          Войти
        </Link>
      </p>
    </main>
  );
}
