import styles from "./ProfilePage.module.css";

import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
// import { logoutUser, updateUser } from "../../services/actions/Registration";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, PasswordInput, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";

import { useInputForm } from "Hooks/handleInput";

export function ProfilePage() {
  const { value, handleChange, textError, isError } = useInputForm({ name: " ", email: " ", password: " " });

  const dispatch = useDispatch();
  // const history = useHistory();
  // const { user } = useSelector((store) => store.RegisterUser);
  let user = true;
  console.log(user);
  // if (!user) {
  //   history.replace({ pathname: "/login" });
  // }
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user && user.name && user.email) {
      setForm({
        name: user.name,
        email: user.email,
        password: user.password ? user.password : "",
      });
    }
  }, [user]);

  const onLogOut = () => {
    // dispatch(logoutUser());
  };
  // const onChange = (e) => {
  //   setForm({
  //     ...form,
  //     [e.target.name]: e.target.value,
  //   });
  //   console.log(form);
  // };

  const handleSubmit = () => {
    const updateForm = {
      name: form.name,
      email: form.email,
      password: form.password,
    };
    console.log(updateForm);
    // dispatch(updateUser(updateForm));
  };

  const handleSubmitCancel = () => {
    setForm({
      name: user.name,
      email: user.email,
      password: user.password,
    });
  };

  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.navBlock}`}>
        <NavLink
          to="/profile"
          activeClassName={`${styles.link_active}`}
          className={`${styles.link} text text_type_main-medium`}
        >
          Профиль
        </NavLink>
        <NavLink
          to="/profile/orders"
          activeClassName={`${styles.link_active}`}
          className={`${styles.link} text text_type_main-medium`}
        >
          История заказов
        </NavLink>
        <NavLink to="/login" onClick={onLogOut} className={`${styles.link} text text_type_main-medium`}>
          Выход
        </NavLink>
        <p className={"text text_type_main-default text_color_inactive mt-20"}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <form className={`${styles.form}`}>
        <Input
          extraClass={`${styles.input} mb-6`}
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
          extraClass={`${styles.input} mb-6`}
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
          extraClass={`${styles.input} mb-6`}
          placeholder="Пароль"
          name="password"
          onChange={handleChange}
          value={value.password || ""}
          errorText={textError.password}
          error={isError.password}
          // required
        />
        {/* <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={onChange}
          icon={"EditIcon"}
          value={form.name}
          name={"name"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="mb-6"
        />
        <Input
          type={"email"}
          placeholder={"Логин"}
          onChange={onChange}
          icon={"EditIcon"}
          value={form.email}
          name={"email"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="mb-6"
        />
        <Input
          type={"password"}
          placeholder={"Пароль"}
          onChange={onChange}
          icon={"EditIcon"}
          value={form.password}
          name={"password"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="mb-6"
        /> */}
        <Button extraClass="mr-6" htmlType="button" size="medium" onClick={() => handleSubmit()}>
          Сохранить
        </Button>
        <Button htmlType="button" size="medium" onClick={() => handleSubmitCancel()}>
          Отменить
        </Button>
      </form>
    </div>
  );
}
