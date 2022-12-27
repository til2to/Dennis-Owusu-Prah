import { CHANGE_CURRENCY } from '../Types';

const initialState = {
  currentCurrency: 0
};

export const currencyReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_CURRENCY:
      state.currentCurrency = action.payload
      console.log(state.currentCurrency)

      window.localStorage.setItem('SelectedCurrency', JSON.stringify(state.currentCurrency))
      let currencyIndex = JSON.parse(window.localStorage.getItem('SelectedCurrency'))
      console.log(currencyIndex)

      let products = JSON.parse(window.localStorage.getItem('data')) || []

      window.localStorage.setItem('total', 0)
      // let amountIndex = parseInt(window.localStorage.getItem('SelectedCurrency'))

      let productAmount, value = [];
      products.forEach((product, index) => {
        productAmount = (product.prices[currencyIndex].amount * product.count) 
        value.push(productAmount)
      })
      const sum = value.reduce(
        (initialValue, currentValue) => initialValue + currentValue, 0);

      window.localStorage.setItem('total', JSON.stringify(sum))

      // return {
      //   ...state,
      //   currentCurrency: {...state.currentCurrency}
      // }
    default:
      return state;
  }
}