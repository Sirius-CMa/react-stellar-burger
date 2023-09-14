import { useState, useCallback } from "react";

export const usePopup = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [ingredient, setIngredient] = useState(null);

  const openPopup = useCallback((component) => {
    component && setIngredient(component);
    setIsPopupOpen(true);
  }, []);

  const closePopup = useCallback(() => {
    setIngredient(null);
    setIsPopupOpen(false);
  }, []);

  return {
    isPopupOpen,
    openPopup,
    closePopup,
    ingredient
  };
};
