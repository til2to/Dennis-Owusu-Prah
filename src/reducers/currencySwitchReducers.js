import { CHANGE_CURRENCY } from '../Types';


let currency = JSON.parse(window.localStorage.getItem('SelectedCurrency'));
const initialState = {
  currentCurrency: currency
};

export const currencyReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_CURRENCY:
      currency = action.payload

      window.localStorage.setItem('SelectedCurrency', JSON.stringify(currency))
      let products = JSON.parse(window.localStorage.getItem('data')) || []
      window.localStorage.setItem('total', 0)

      let productAmount, value = [];
      products.forEach((product, index) => {
        productAmount = (product.prices[currency].amount * product.count) 
        value.push(productAmount)
      })
      const sum = value.reduce(
        (initialValue, currentValue) => initialValue + currentValue, 0);

      window.localStorage.setItem('total', JSON.stringify(sum))

      return currency

    default:
      return state;
  }
}