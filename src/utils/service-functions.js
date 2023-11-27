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
