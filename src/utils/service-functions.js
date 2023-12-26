export const getTotalPrice = (ingredients, sortDataById) => {
  function bouncer(array) {
    return array.filter(function (e) {
      return e;
    });
  }
  let a = bouncer(ingredients)


  return a.reduce((acc, currentValue) => {

    return acc + sortDataById[currentValue].price;
  }, 0);
};


export const saveState = (state) => {
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
