import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import CartItem from '../../components/CartItem/CartItem';

import {
  Container,
  Wrapper,
  Title,
  EmptyCart,
  TaxInfo,
  Items,
  Button
} from './CartElements'


class Cart extends Component {
  render() {
    let { cartItems: { cart, quantity },  } = this.props;
    let cartTotal = JSON.parse(window.localStorage.getItem('total'))
    let price_index = JSON.parse(window.localStorage.getItem('SelectedCurrency'))
    let local_data = JSON.parse(window.localStorage.getItem('data'))
    let tax = 0.21 * cartTotal

    console.log(local_data)
    
    return (
      <Container>
        <Wrapper>
          <Title>
            <span>CART</span>
          </Title>
          {
            quantity === 0
              ?
              (<EmptyCart>Your cart is empty. Please add a product</EmptyCart>)
              :
              local_data.map((item, index) => (
                <CartItem key={index} item={item} addCount={this.props.addCount} />
            ) )
          }
          <TaxInfo>
            <Items>
              Tax: {cart[0] && cart[0].prices[price_index].currency.symbol } {tax.toFixed(2)}
            </Items>
            <Items>Quantity: {quantity}</Items>
            {
            cart[0] && 
              <Items>
                Total: { cart[0].prices[price_index].currency.symbol }
                {''} {parseFloat(cartTotal).toFixed(2)} 
              </Items>
            }
          </TaxInfo>
          <Button> ORDER </Button>
        </Wrapper>
      </Container>
    )
  }
}

export default connect((state) => ({ cartItems: state.cart, currentCurrency: state.currency }), null)(Cart)