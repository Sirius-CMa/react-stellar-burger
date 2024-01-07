import styles from "./AuthPagesStyles.module.css";

import { Link, useNavigate } from "react-router-dom";
import { FormEvent, useEffect } from "react";

import { Button, EmailInput, PasswordInput, Input } from "@ya.praktikum/react-developer-burger-ui-components";

import { useInputForm } from "Hooks/handleInput";
// import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "Action/authorization";
import { getDataAuth } from "../../redux/Selectors";
import { paths } from "Utils/paths";
import { useAppDispatch, useAppSelector } from "../../typesData";

export function RegisterPage() {
  const { value, handleChange, textError, isErrors } = useInputForm({ name: "", email: "", password: "" });
  const { auth, registerRequest } = useAppSelector(getDataAuth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(registerUser({ email: value.email, password: value.password, name: value.name }));
  };

  useEffect(() => {
    if (auth) {
      navigate(paths.home);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return (
    <main className={styles.container}>
      <h2 className={`${styles.title} text text_type_main-medium`}>Регистрация</h2>
      <form className={styles.form} name={"register-page-form"} onSubmit={handleSubmit}>
        <Input
          extraClass={styles.input}
          placeholder="Имя"
          type="text"
          minLength={2}
          maxLength={30}
          onChange={handleChange}
          name={"name"}
          value={value.name || ""}
          errorText={textError.name}
          error={isErrors.name}
          icon={"EditIcon"}
        // required
        />
        <EmailInput
          extraClass={styles.input}
          placeholder="E-mail"
          name="email"
          value={value.email || ""}
          onChange={handleChange}
          // errorText={textError.email}
          // error={isErrors.email}
          isIcon
        // required
        />
        <PasswordInput
          extraClass={styles.input}
          placeholder="Пароль"
          name="password"
          onChange={handleChange}
          value={value.password || ""}
        // errorText={textError.password}
        // error={isErrors.password}
        // required
        />
        <Button extraClass={styles.submitButton} type="primary" htmlType="submit" size="large">
          {!registerRequest ? "Зарегистрироваться" : "Регистрация..."}
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
