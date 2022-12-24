import { CHANGE_CURRENCY } from '../Types';

const initialState = {
  currentCurrency: 0,
};

export const currencyReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_CURRENCY:
      let currencyCu = action.payload
      console.log(currencyCu)

      return {
        ...state,
        currentCurrency: [...state.currentCurrency, currencyCu]
      }
    default:
      return state;
  }
}