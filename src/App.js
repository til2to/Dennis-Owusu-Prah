import ReactDOM from 'react-dom';
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
    this.state = {
      currency: window.localStorage.getItem("Currency") || [],
      selectedCurrency: window.localStorage.getItem("SelectedCurrency"),
    };
  }

  async componentDidMount() {
    const { selectedCurrency } = this.state
    // if(currency === null) window.localStorage.setItem("Currency", []);
    if(selectedCurrency === null) window.localStorage.setItem("SelectedCurrency", "0");
  }

  async setCurrency (data) {
    const res = await window.localStorage.setItem("Currency", JSON.stringify(data))
  }

  render() {
    const { currency, visible } = this.state

    return (
      <>
        {
          currency && (
            <Query query={PRICE_QUERY}>
              {({ data, loading, error }) => {
                if (loading) return <h1>loading</h1>
                if (error) return <h1>{error.message}</h1>;

                this.setCurrency(data?.category?.products[0]?.prices);
              }}
            </Query>
          )
        }
        <Provider store={store}>
          <Router>
            <Container>
              <Navbar />
            </Container>
            <div className="app">
              <Switch>
                <Route exact path="/cart" component={Cart} />
                <Route path="/product/:id" component={Product} />
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
