import { ADD_TO_CART, ADD_COUNT, SUB_COUNT } from '../Types';


let currentCart = JSON.parse(window.localStorage.getItem('data')) || [];
let currentTotal = JSON.parse(window.localStorage.getItem('total')) || 0

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
      
      let exist = false 

      // check if item exist
      currentCart.forEach((localProduct) => {  
        if(checkLocalStorage(currentProduct.attributes, localProduct.attributes))
        {
          exist = true;
          console.log('item exist')
          let local_total = JSON.parse(window.localStorage.getItem('total'))
          local_total += currentProduct.prices[amountIndex].amount;
          window.localStorage.setItem('total', JSON.stringify(local_total))

          localProduct.count = localProduct.count + 1
          window.localStorage.setItem('data', JSON.stringify(currentCart))
        }
      })

      function checkLocalStorage (localStorage, currentProduct_attributes) {
        return (
          localStorage.length === currentProduct_attributes.length &&
          localStorage.every((element_1) =>
          currentProduct_attributes.some((element_2) =>
            Object.keys(element_1).every((key) => 
            element_1[key] === element_2[key]))
          )
        );
      };
      
      // item not in cart
      if (exist === false) {
        state.quantity += 1
        console.log('item does not exist')
        
        let amountIndex = parseInt(window.localStorage.getItem('SelectedCurrency'))
        currentCart.push(currentProduct)
        window.localStorage.setItem('data', JSON.stringify(currentCart))

        let local_total = JSON.parse(window.localStorage.getItem('total'))
        local_total += currentProduct.prices[amountIndex].amount 
        window.localStorage.setItem('total', JSON.stringify(local_total))
        
        return {
          ...state,
          cart: [...currentCart]
        }
      }
      return {
        ...state,
        cart: [...currentCart]
      }
      
      case ADD_COUNT: 
      let attributes = action.payload
      let priceIndex = JSON.parse(window.localStorage.getItem('SelectedCurrency'))
      let localTotal = JSON.parse(window.localStorage.getItem('total'))

      currentCart.forEach((localProduct) => {  
        if(isSame(attributes, localProduct.attributes)){
          
          localProduct.count = localProduct.count + 1
          window.localStorage.setItem('data', JSON.stringify(currentCart))
          
          localProduct.count >= 1 && (localTotal += localProduct.prices[priceIndex].amount)
          window.localStorage.setItem('total', JSON.stringify(localTotal))
        }
      })

      function isSame (attributes, localProduct_attributes) {
        return (
          attributes.length === localProduct_attributes.length &&
          attributes.every((element_1) =>
          localProduct_attributes.some((element_2) =>
            Object.keys(element_1).every((key) => 
            element_1[key] === element_2[key]))
          )
        );
      };

      return {
        ...state,
        cart: [...state.cart]
      }

    case SUB_COUNT:
      let currentAttributes = action.payload
      let price_Index = parseInt(window.localStorage.getItem('SelectedCurrency'))
      let localTotal_sub = JSON.parse(window.localStorage.getItem('total'))

      currentCart.map((localObj, index) => {
        if(isEqual(currentAttributes, localObj.attributes)){
          if(localObj.count === 0){
            currentCart.splice(index, 1)
            state.quantity -= 1
            return window.localStorage.setItem('data', JSON.stringify(currentCart))
          }

          localObj.count !== 0 && (localObj.count -= 1)
          window.localStorage.setItem('data', JSON.stringify(currentCart))

          if(localTotal_sub > 0) {
            localTotal_sub -= localObj.prices[price_Index].amount
          }
          window.localStorage.setItem('total', JSON.stringify(localTotal_sub))
        }
        return null
      })

      function isEqual (attributes, localProduct_attributes) {
        return (
          attributes.length === localProduct_attributes.length &&
          attributes.every((element_1) =>
          localProduct_attributes.some((element_2) =>
            Object.keys(element_1).every((key) => 
            element_1[key] === element_2[key]))
          )
        );
      };

      return {
        ...state,
        cart: [...currentCart]
      }

    default:
      return state;
  }
}