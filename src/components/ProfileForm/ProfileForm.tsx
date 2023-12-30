import styles from "./ProfileForm.module.css";

import { useEffect } from "react";
import { Button, Input, PasswordInput, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";

import { useInputForm } from "../../hooks/handleInput";
import { getDataAuth } from "../../redux/Selectors";
import { updateUser } from "Action/authorization";
import { useAppDispatch, useAppSelector } from "../../typesData";

//

export function ProfileForm() {
  const dispatch = useAppDispatch();

  const { auth, user } = useAppSelector(getDataAuth);
  const { value, setValue, textError, isErrors, handleChange, resetForm } = useInputForm({
    name: '',
    email: '',
    password: '',
  })

  useEffect(() => {
    if (auth && user.name && user.email) {
      resetForm();
      setValue({ name: user.name, email: user.email, password: "" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, auth]);

  const handeleSubmit = (evt: any) => {
    evt.preventDefault();
    //"jwt expired"
    if (evt.nativeEvent.submitter.name === "save") {
      dispatch(updateUser({ name: value.name, email: value.email, password: value.password }));
    } else {
      resetForm();
      setValue({ name: user.name, email: user.email, password: "" });
    }
  };

  return (
    <>
      <form className={`${styles.container}`} onSubmit={handeleSubmit}>
        <Input
          extraClass={`${styles.input} mb-6`}
          placeholder={"Имя"}
          type={"text"}
          minLength={2}
          maxLength={30}
          onChange={handleChange}
          name={"name"}
          value={value.name || ""}
          errorText={textError.name}
          error={isErrors.name}
          icon={"EditIcon"}
        />
        <EmailInput
          extraClass={`${styles.input} mb-6`}
          placeholder="E-mail"
          name="email"
          value={value.email || ""}
          onChange={handleChange}
          isIcon
        />
        <PasswordInput
          extraClass={`${styles.input} mb-6`}
          placeholder="Пароль"
          name="password"
          onChange={handleChange}
          value={value.password || ""}
        />

        <Button htmlType="submit" name="save" extraClass="mr-6" size="medium">
          Сохранить
        </Button>
        <Button htmlType="submit" name="cancel" size="medium">
          Отменить
        </Button>
      </form>
    </>
  );
}
