import { ADD_TO_CART, ADD_COUNT, SUB_COUNT, CONVERT_TOTAL } from '../Types';


const currentCart = JSON.parse(window.localStorage.getItem('data')) || [];
let currentTotal = JSON.parse(window.localStorage.getItem('total'))

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
        const isEqual = (itemArray, currentArray) => {
          return (
            itemArray.length === currentArray.length &&
            itemArray.every((element_1) =>
              currentArray.some((element_2) =>
              Object.keys(element_1).every((key) => 
              element_1[key] === element_2[key]))
            )
          );
        };
        
        if(isEqual(item.attributes, currentProduct.attributes)){
          exist = true;
          console.log('item exist')

          let local_total = JSON.parse(window.localStorage.getItem('total'))
          local_total += currentProduct.prices[amountIndex].amount;
          window.localStorage.setItem('total', JSON.stringify(local_total))
          
          let updateLocalcount = JSON.parse(window.localStorage.getItem('data'))

          updateLocalcount.forEach((localProduct) => {  
            if(checkLocalStorage(currentProduct.attributes, localProduct.attributes))
            {
              console.log('true')
              localProduct.count = localProduct.count + 1
              window.localStorage.setItem('data', JSON.stringify(updateLocalcount))
            }
          })

          function checkLocalStorage (localStorage, currentArray) {
            return (
              localStorage.length === currentArray.length &&
              localStorage.every((element_1) =>
                currentArray.some((element_2) =>
                Object.keys(element_1).every((key) => 
                element_1[key] === element_2[key]))
              )
            );
          };
        }
      })
      
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

      let updateLocalcount = JSON.parse(window.localStorage.getItem('data'))
      let priceIndex = JSON.parse(window.localStorage.getItem('SelectedCurrency'))
      let localTotal = JSON.parse(window.localStorage.getItem('total'))

      updateLocalcount.forEach((localProduct) => {  
        if(isSame(attributes, localProduct.attributes)){
          
          localProduct.count = localProduct.count + 1
          localProduct.count >= 1 && (localTotal += localProduct.prices[priceIndex].amount)
          window.localStorage.setItem('total', JSON.stringify(localTotal))
          window.localStorage.setItem('data', JSON.stringify(updateLocalcount))
        }
      })

      function isSame(attributes, localProduct_attributes) {
        return JSON.stringify(attributes) === JSON.stringify(localProduct_attributes);
      }

      return {
        ...state,
        cart: [...state.cart]
      }

    case SUB_COUNT:
      let currentAttributes = action.payload
      let cartsProducts = state.cart

      let updateLocalsub = JSON.parse(window.localStorage.getItem('data'))
      let product_price_Index = parseInt(window.localStorage.getItem('SelectedCurrency'))
      let localTotal_sub = JSON.parse(window.localStorage.getItem('total'))

      updateLocalsub.forEach((localProduct) => {
        if(isEqual(currentAttributes, localProduct.attributes)){

          localProduct.count != 0 && (localProduct.count = localProduct.count - 1)
          if(localTotal_sub != 0) {
            localTotal_sub -= localProduct.prices[product_price_Index].amount
          }
          window.localStorage.setItem('total', JSON.stringify(localTotal_sub))
          window.localStorage.setItem('data', JSON.stringify(updateLocalsub))
        }
      })

      function isEqual(currentAttributes, localProduct_attributes) {
        return JSON.stringify(currentAttributes) === JSON.stringify(localProduct_attributes);
      }

      return {
        ...state,
        cart: [...state.cart]
      }

    default:
      return state;
  }
}