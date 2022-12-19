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
      const setCurrentProduct = () => {
        state.current.push(currentProduct)
      }

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

        // return {
        //   ...state,
        //   cart: [...state.cart] 
        // }
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
      
    case CONVERT_TOTAL:
      // let localTotal = window.localStorage.setItem('total', 0)

      // let amtIndex = parseInt(window.localStorage.getItem('SelectedCurrency'))
      // let currentAmt = currentProduct.prices[amtIndex].amount * currentProduct.count

      // state.total += currentProduct.prices[amtIndex].amount 
      // localTotal = window.localStorage.setItem('total', JSON.stringify(state.total))

      // return {
      //   ...state,
      //   cart: [...state.cart]
      // }

    case ADD_COUNT: 
      let attributes = action.payload
      let cartProducts = state.cart

      cartProducts.forEach((product) => {
        if(attributes === product.attributes){
          product.count = product.count + 1

          let updateLocalcount = JSON.parse(window.localStorage.getItem('data'))
          
          let amountIndex = JSON.parse(window.localStorage.getItem('SelectedCurrency'))
          
          product.count >= 1 && (state.total += 
            product.prices[amountIndex].amount)
          parseFloat(state.total)

          let localTotal = JSON.parse(window.localStorage.getItem('total'))
          localTotal+=product.prices[amountIndex].amount
          window.localStorage.setItem('total', JSON.stringify(localTotal))       

          updateLocalcount.forEach((localProduct) => {  
            if(isSame(product.attributes, localProduct.attributes)){
              localProduct.count = product.count
              window.localStorage.setItem('data', JSON.stringify(updateLocalcount))
            }
          })

          function isSame(product, localProduct) {
            return JSON.stringify(product) === JSON.stringify(localProduct);
          }
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

          updateLocalsub.forEach((localProduct) => {
            if(isSame(product.attributes, localProduct.attributes)){
              localProduct.count = product.count
              window.localStorage.setItem('data', JSON.stringify(updateLocalsub))
            }
          })

          function isSame(product, localProduct) {
            return JSON.stringify(product) === JSON.stringify(localProduct);
          }
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