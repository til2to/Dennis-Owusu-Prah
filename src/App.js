import "./App.css";
import React, { Component } from "react";
import PropTypes from "prop-types";
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
import styled from "styled-components";
import { PRICE_QUERY } from "./Data/GraphqlData";
import { Query } from "react-apollo";


class App extends Component {
  constructor(props) {
    super(props);
    /* state to hold to get and hold the currencies from local storage */ 
    this.state = {
      currency: window.localStorage.getItem("Currency") || [],
      // selectedCurrency: window.localStorage.getItem("SelectedCurrency"),
    };
  }

  async componentDidMount() {
    // const { selectedCurrency } = this.state
    // set the currency to first currency whenever there's is undefined
    // if(selectedCurrency === null) window.localStorage.setItem("SelectedCurrency", 0);
  }

  // function to store the currencies from the api to the local storage
  async setCurrency (data) {
    const res = window.localStorage.setItem("Currency", JSON.stringify(data))
  }

  render() {
    const { currency } = this.state

    return (
      <>
      {/* fetch currencies from api */}
        {
          currency && (
            <Query query={PRICE_QUERY}>
              {({ data, loading, error }) => {
                if (loading) return <h1>loading</h1>
                if (error) return <h1>{error.message}</h1>;

                {/* set currencies of first product to the local storage at once */} 
                this.setCurrency(data?.category?.products[0]?.prices);
              }}
            </Query>
          )
        }
        
        {/* Connect store to the app */}
        <Provider store={store}>
          <Router>
            <Container>
              <Navbar />
            </Container>
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
              </Switch>
            </div>
          </Router>
        </Provider>
      </>
    );
  }
}

export default App;

const Container = styled.div`
  padding: 10px;
  margin: 0 15 0 25px;
`;
