import { ADD_TO_CART, ADD_COUNT, SUB_COUNT, CART_DATA } from '../Types';


const currentCart = JSON.parse(window.localStorage.getItem('data')) || [];
const currentTotal = JSON.parse(window.localStorage.getItem('total'))

const initialState = {
  cart: currentCart,
  quantity: currentCart.length,
  total: currentTotal,
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const currentProduct = action.payload

      let amountIndex = parseInt(window.localStorage.getItem('SelectedCurrency'))
      let currentAmount = currentProduct.prices[amountIndex].amount * currentProduct.count

      let exist = false
      state.cart?.forEach(item => {
        if (isEqual(currentProduct, item)) {
          exist = true   
          console.log('item exist')
          
          return {
            ...state,
            cart: [...state.cart] 
          }
        }
      })
      
      function isEqual(currentProduct, item) {
        return JSON.stringify(currentProduct) === JSON.stringify(item);
      }

      // item not in cart
      if (exist == false) {
        state.quantity += 1
        console.log('item does not exist')

        let amountIndex = parseInt(window.localStorage.getItem('SelectedCurrency'))
        let currentAmount = currentProduct.prices[amountIndex].amount * currentProduct.count

        let arr = window.localStorage.setItem('data', JSON.stringify([...state.cart, currentProduct]))
        state.total += currentProduct.prices[amountIndex].amount 
        let localTotal = window.localStorage.setItem('total', JSON.stringify(state.total))

        return {
          ...state,
          cart: [...state.cart, currentProduct]      
        }
      }
      
    case ADD_COUNT: 
      let attributes = action.payload
      let cartProducts = state.cart

      cartProducts.forEach((product) => {
        if(attributes === product.attributes){
          product.count = product.count + 1

          let updateLocalcount = JSON.parse(window.localStorage.getItem('data'))
          // let selectedCurrency: JSON.parse(window.localStorage.getItem("SelectedCurrency"));
          
          let amountIndex = JSON.parse(window.localStorage.getItem('SelectedCurrency'))
          
          product.count >= 1 && (state.total += product.prices[amountIndex].amount)
          parseFloat(state.total)

          let localTotal = JSON.parse(window.localStorage.getItem('total'))
          localTotal+=product.prices[amountIndex].amount
          window.localStorage.setItem('total', JSON.stringify(localTotal))       

          updateLocalcount.forEach((localCount) => {
            if(attributes === localCount.attributes){
              localCount.count = parseInt(product.count)
              window.localStorage.setItem('data', JSON.stringify(updateLocalcount))
            }
          })
        }
      })

      return {
        ...state,
        cart: [...state.cart]
      }

    case SUB_COUNT:
      let currentAttributes = action.payload
      let cartsProducts = state.cart

      let updateLocalsub = JSON.parse(window.localStorage.getItem('data'))

      cartsProducts.forEach((product) => {
        if(currentAttributes === product.attributes){
          product.count > 0 && product.count --

          let amountIndex = parseInt(window.localStorage.getItem('SelectedCurrency'))

          let localTotal = JSON.parse(window.localStorage.getItem('total'))
          
          if(localTotal !== 0) {
            localTotal -= product.prices[amountIndex].amount
          }
          
          window.localStorage.setItem('total', JSON.stringify(localTotal))
          
          if(product.count != 0 && product.prices[amountIndex].amount){
            state.total -= product.prices[amountIndex].amount
          } 

          console.log(parseFloat(localTotal).toFixed(2))  

          updateLocalsub.forEach((localCount) => {
            if(currentAttributes === localCount.attributes){
              localCount.count = parseInt(product.count)
              localStorage.setItem('data', JSON.stringify(updateLocalsub))
            }
          })
        }
      })

      return {
        ...state,
        cart: [...state.cart]
      }

    default:
      return state;
  }
}