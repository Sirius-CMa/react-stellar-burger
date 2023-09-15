/* eslint-disable no-loop-func */

export function sortIngredients(data) {
  const keys = [...new Set(data.map(el => el.type))]
  const sortedIngredients = {}
  for (var i in keys) {
    sortedIngredients[keys[i]] = data.filter(el => el.type === keys[i])
  }

  // console.log('sortedIngredients - ', sortedIngredients);
  return sortedIngredients
}

