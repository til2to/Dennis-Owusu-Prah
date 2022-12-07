import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { productsReducer } from '../reducers/ProductsReducers';
import { cartReducer } from '../reducers/cartReducers';


const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers({
    cart: cartReducer,
    products: productsReducer,
  }),
     
  composeEnhancer(applyMiddleware(thunk))
);

export default store;