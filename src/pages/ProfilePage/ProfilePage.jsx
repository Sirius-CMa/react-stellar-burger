import styles from "./ProfilePage.module.css";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, PasswordInput, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";

import { useInputForm } from "Hooks/handleInput";
import { getDataAuth } from "Selectors";
import { updateUser } from "Action/authorization";
import { NavBlockProfile } from "Components/NavBlockProfile";

export function ProfilePage() {
  const dispatch = useDispatch();

  const { auth, user } = useSelector(getDataAuth);

  const { value, handleChange, textError, isError, resetForm, setValue } = useInputForm({
    name: user.name,
    email: user.email,
    password: "",
  });

  useEffect(() => {
    if (auth && user.name && user.email) {
      resetForm();
      setValue({ name: user.name, email: user.email, password: "" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, auth]);

  // const onLogOut = () => {
  //   dispatch(logoutUser());
  // };

  const handleSubmitSave = () => {
    dispatch(updateUser({ name: value.name, email: value.email, password: value.password }));
  };

  const handleSubmitCancel = () => {
    resetForm();
    setValue({ name: user.name, email: user.email, password: "" });
  };
  return (
    <div className={`${styles.container}`}>
      <NavBlockProfile />
      <form className={`${styles.form}`}>
        <Input
          extraClass={`${styles.input} mb-6`}
          placeholder={"Имя"}
          type={"text"}
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

        <Button extraClass="mr-6" htmlType="button" size="medium" onClick={() => handleSubmitSave()}>
          Сохранить
        </Button>
        <Button htmlType="button" size="medium" onClick={() => handleSubmitCancel()}>
          Отменить
        </Button>
      </form>
    </div>
  );
}
