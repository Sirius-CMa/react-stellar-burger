import { RootState, TSortDataById } from "../typesData";

export const getTotalPrice = (ingredients: Array<string>, sortDataById: TSortDataById) => {
  function bouncer(array: any = {}) {
    return array.filter(function (e: string) {
      return e;
    });
  }
  let ingredientsNotNull = bouncer(ingredients)

  return ingredientsNotNull.reduce((acc: number, currentValue: string) => {
    return acc + sortDataById[currentValue].price;
  }, 0);
};


export const saveState = (state: RootState) => {
  try {
    const serialisedState = JSON.stringify(state);

    localStorage.setItem('app_state', serialisedState);
  } catch (err) {
  }
};

export const loadState = () => {
  try {
    const serialisedState = localStorage.getItem('app_state');

    if (!serialisedState) return undefined;
    return JSON.parse(serialisedState);
  } catch (err) {
    return undefined;
  }
};
