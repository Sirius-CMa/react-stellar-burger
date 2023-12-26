import { useState } from "react";

export const useInputForm = () => {
  const defaultValues = {}

  const [value, setValue] = useState(defaultValues);

  const [textError, setTextError] = useState(defaultValues);
  const [isError, setIsError] = useState(defaultValues);

  const handleChange = (evt) => {
    // console.log(evt);
    const { name, value, validity: { valid }, validationMessage } = evt.target;
    // console.log(valid);
    setValue((state) => ({ ...state, [name]: value }));
    if (!valid) {
      setIsError((state) => ({ ...state, [name]: true }));
      setTextError((state) => ({ ...state, [name]: validationMessage }));
    } else {
      setIsError((state) => ({ ...state, [name]: false }));
      setTextError((state) => ({ ...state, [name]: '' }));
    }
  };

  const resetForm = () => {
    setValue(defaultValues);
    setIsError(defaultValues);
    setTextError(defaultValues);
  };

  return { value, setValue, textError, isError, handleChange, resetForm };
};
