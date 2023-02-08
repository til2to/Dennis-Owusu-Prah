import "./App.css";
import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Products from "./Pages/ProductList/ProductList";
import Product from "./Pages/ProductDetail/ProductDetail";
import Cart from "./Pages/Cart/Cart";
import store from "./redux/store";
import { Provider } from "react-redux";
import { PRICE_QUERY } from "./Data/GraphqlData";
import { Query } from "react-apollo";
import { CategoryName } from "./Pages/ProductList/ProductListElements";


class App extends Component {
  constructor(props) {
    super(props);
    /* state to hold to get and hold the currencies from local storage */ 
    this.state = {
      currency: window.localStorage.getItem("Currency") || [],
      selectedCurrency: window.localStorage.getItem("SelectedCurrency"),
    };
  }

  async componentDidMount() {
    const { selectedCurrency } = this.state

    // set the currency to first currency whenever there's is undefined
    if(selectedCurrency === null) {
      window.localStorage.setItem("SelectedCurrency", 0)
    }
  }

  // function to store the currencies from the api to the local storage
  async setCurrency (data) {
    window.localStorage.setItem("Currency", JSON.stringify(data))
  }

  render() {
    const { currency } = this.state

    return (
      <div className="container">
        {
          (
            <Query query={PRICE_QUERY}>
              {({ data, loading, error }) => {
                if (loading) return <h1>loading</h1>
                if (error) return <h1>{error.message}</h1>;
                
                /* set currencies of first product to the local storage at once */
                if(!currency || currency.length === 0){
                  this.setCurrency(data?.category?.products[0]?.prices)
                }
              }}
            </Query>
          )
        }
        
        {/* Connect store to the app */}
        <Provider store={store}>
          <Router>
            <Navbar />
            <CategoryName/>
            
            <div className="app">
              <Switch>
                {/* path to the cart */} 
                <Route exact path="/cart" component={Cart} /> 
                {/* path based on product id */}
                <Route path="/product/:id" component={Product} /> 
                {/* path based on category name */} 
                <Route path="/products/:name" component={Products} /> 
                <Route exact path="/">
                  <Redirect to="/products/all/" />
                </Route>
                <Route exact path="/products/all">
                  <Redirect to="/" />
                </Route>
              </Switch>
            </div>
          </Router>
        </Provider>
      </div>
    );
  }
}

export default App;

// const Container = styled.div`
//   padding: 10px;
//   margin: 0 15 0 25px;
// `;
