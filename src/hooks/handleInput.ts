import { useState, ChangeEvent } from "react";

type DictionaryStrStr = Record<string, string>;
type DictionaryStrBool = Record<string, boolean>;


export const useInputForm = (defaultValues = {}) => {

  const [value, setValue] = useState<DictionaryStrStr>(defaultValues);
  const [textError, setTextError] = useState<DictionaryStrStr>({});
  const [isErrors, setIsErrors] = useState<DictionaryStrBool>({});

  const handleChange = (evt: ChangeEvent) => {
    // console.log(evt);
    const { name, value, validity: { valid }, validationMessage } = evt.target as HTMLFormElement;
    // console.log(valid);
    setValue((state) => ({ ...state, [name]: value }));
    if (!valid) {
      setIsErrors((state) => ({ ...state, [name]: true }));
      setTextError((state) => ({ ...state, [name]: validationMessage }));
    } else {
      setIsErrors((state) => ({ ...state, [name]: false }));
      setTextError((state) => ({ ...state, [name]: '' }));
    }
  };

  const resetForm = () => {
    setValue(defaultValues);
    setIsErrors({});
    setTextError({});
  };

  return { value, setValue, textError, isErrors, handleChange, resetForm };
};
