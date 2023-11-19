import { useState } from "react";

export const useInputForm = () => {
  const defaultValues = {}

  const [value, setValue] = useState(defaultValues);

  const [textError, setTextError] = useState(defaultValues);
  const [isError, setIsError] = useState(defaultValues);

  const handleChange = (evt) => {
    const { name, value, validity: { valid }, validationMessage } = evt.target;
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
    setTextError(defaultValues);
    setIsError(defaultValues);
  };

  return { value, setValue, textError, isError, handleChange, resetForm };
};
