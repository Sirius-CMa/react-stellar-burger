const NEXT_STEP = 'NEXT_STEP'
const PREVIOUS_STEP = 'PREVIOUS_STEP'

export const burgerConstructorReducer = (state = '', action) => {
  switch (action.type) {
    case NEXT_STEP: {
      return state === 'cart'
        ? 'delivery'
        : state === 'delivery'
          ? 'checkout'
          : state === 'checkout'
            ? 'checkout'
            : 'checkout';
    }
    case PREVIOUS_STEP: {
      return state === 'cart'
        ? 'cart'
        : state === 'delivery'
          ? 'cart'
          : state === 'checkout'
            ? 'delivery'
            : 'cart';
    }
    default: {
      return state;
    }
  }
}
